*** Settings ***
Library     SeleniumLibrary  timeout=${timeout}  implicit_wait=${implicit_wait}  run_on_failure=do this on failure
Library     OperatingSystem
#Library     XvfbRobot           # sudo apt install xvfb + pip install robotframework-xvfb

Library    file_operations.py
Library    utilities.py

Resource   ./tables.robot
Resource   ./table_tool.robot

*** Variables ***
${browser}    chrome
${headless}   1
${FILES_DIR}    ${EXECDIR}${/}tests${/}files${/}

${timeout}          30
${implicit_wait}    3
${release_complete_wait}   900

*** Keywords ***
do this on failure
    capture large screenshot
    set selenium timeout  3

user opens the browser
    run keyword if    "${browser}" == "chrome"    user opens chrome
    run keyword if    "${browser}" == "firefox"   user opens firefox
    run keyword if    "${browser}" == "ie"        user opens ie
    go to    about:blank

user opens chrome
    run keyword if    ${headless} == 1      user opens chrome headless
    #run keyword if    ${headless} == 1      user opens chrome with xvfb
    run keyword if    ${headless} == 0      user opens chrome without xvfb

user opens firefox
    run keyword if    ${headless} == 1      user opens firefox headless
    #run keyword if    ${headless} == 1      user opens firefox with xvfb
    run keyword if    ${headless} == 0      user opens firefox without xvfb

user opens ie
    open browser   about:blank   ie
    maximize browser window

# Requires chromedriver v2.31+ -- you can alternatively use "user opens chrome with xvfb"
user opens chrome headless
    ${c_opts} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${c_opts}   add_argument    headless
    Call Method    ${c_opts}   add_argument    disable-gpu
    Call Method    ${c_opts}   add_argument    window-size\=1920,1080
    Call Method    ${c_opts}   add_argument    ignore-certificate-errors
    Create Webdriver    Chrome    crm_alias    chrome_options=${c_opts}

user opens chrome with xvfb
    start virtual display   1920    1080
    ${options}=    evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver

    # --no-sandbox allows chrome to run in a docker container: https://github.com/jessfraz/dockerfiles/issues/149
    run keyword if    ${docker} == 1     Call Method   ${options}   add_argument  --no-sandbox --ignore-certificate-errors

    create webdriver    Chrome   chrome_options=${options}
    set window size    1920    1080

user opens chrome without xvfb
    ${c_opts} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${c_opts}   add_argument    no-sandbox
    Call Method    ${c_opts}   add_argument    disable-gpu
    Call Method    ${c_opts}   add_argument    disable-extensions
    Call Method    ${c_opts}   add_argument    window-size\=1920,1080
    Call Method    ${c_opts}   add_argument    ignore-certificate-errors
    Create Webdriver    Chrome    crm_alias    chrome_options=${c_opts}
    maximize browser window

user opens firefox headless
    ${f_opts} =     Evaluate     sys.modules['selenium.webdriver'].firefox.options.Options()    sys, selenium.webdriver
    Call Method    ${f_opts}   add_argument    -headless
    Create Webdriver    Firefox    firefox_options=${f_opts}

user opens firefox with xvfb
    start virtual display   1920    1080
    open browser   about:blank   firefox
    set window size   1920    1080

user opens firefox without xvfb
    open browser   about:blank   firefox
    maximize browser window

user closes the browser
    close browser

user goes to url
    [Arguments]   ${destination}
    go to   ${destination}

user goes back
    go back

user reloads page
    reload page

user scrolls to the top of the page
    execute javascript  window.scrollTo(0, 0);

user scrolls down
    [Arguments]  ${px}
    execute javascript  window.scrollBy(0, ${px});

user scrolls to element
    [Arguments]  ${element}
    scroll element into view  ${element}

user mouses over element
    [Arguments]  ${element}
    mouse over  ${element}

user gets css property value
    [Arguments]  ${locator}  ${property}
    ${element}=  get webelement  ${locator}
    ${value}=    call method  ${element}  value_of_css_property  ${property}
    [Return]  ${value}

user checks css property value
    [Arguments]  ${locator}  ${property}  ${value}
    ${actual_value}=  user gets css property value  ${locator}  ${property}
    should be equal  ${value}  ${actual_value}

user waits for page to finish loading
    # This is required because despite the DOM being loaded, and even a button being enabled, React/NextJS
    # hasn't finished processing the page, and so click are intermittently ignored. I'm wrapping
    # this sleep in a keyword such that if we find a way to check whether the JS processing has finished in the
    # future, we can change it here.
    sleep  0.2

user waits until page does not contain loading spinner
    user waits until page does not contain element  css:[class^="LoadingSpinner"]

user sets focus to element
    [Arguments]  ${selector}
    wait until page contains element  ${selector}
    set focus to element   ${selector}

user waits until page contains
    [Arguments]    ${pageText}    ${wait}=${timeout}
    wait until page contains   ${pageText}    timeout=${wait}

user waits until page contains element
    [Arguments]    ${element}  ${wait}=${timeout}  ${limit}=None
    wait until page contains element  ${element}  timeout=${wait}  limit=${limit}

user waits until page does not contain
    [Arguments]    ${pageText}
    wait until page does not contain   ${pageText}

user waits until page does not contain element
    [Arguments]    ${element}    ${wait}=${timeout}
    wait until page does not contain element  ${element}   timeout=${wait}

user waits until element contains
    [Arguments]    ${element}    ${text}     ${wait}=${timeout}
    wait until element contains    ${element}    ${text}     timeout=${wait}

user waits until page contains link
    [Arguments]    ${link_text}   ${wait}=${timeout}
    wait until page contains element  xpath://a[.="${link_text}"]   timeout=${wait}

user waits until element contains link
    [Arguments]  ${element}  ${link_text}  ${wait}=${timeout}
    user waits until parent contains element  ${element}  link:${link_text}  timeout=${wait}

user waits until page contains accordion section
    [Arguments]   ${section_title}     ${wait}=${timeout}
    user waits until page contains element  xpath://*[contains(@class,"govuk-accordion__section-button") and text()="${section_title}"]    ${wait}

user waits until page does not contain accordion section
    [Arguments]   ${section_title}     ${wait}=${timeout}
    user waits until page does not contain element  xpath://*[contains(@class,"govuk-accordion__section-button") and text()="${section_title}"]    ${wait}

user verifies accordion is open
    [Arguments]  ${section_text}
    user waits until page contains element   xpath://*[@class="govuk-accordion__section-button" and text()="${section_text}" and @aria-expanded="true"]

user verifies accordion is closed
    [Arguments]  ${section_text}
    user waits until page contains element   xpath://*[@class="govuk-accordion__section-button" and text()="${section_text}" and @aria-expanded="false"]

user checks there are x accordion sections
    [Arguments]  ${num}  ${parent}=css:body
    user waits until parent contains element  ${parent}  css:[data-testid="accordionSection"]  limit=${num}

user waits until accordion section contains text
    [Arguments]  ${section_text}   ${text}
    ${section}=  user gets accordion section content element  ${section_text}
    user waits until parent contains element   ${section}   xpath://*[text()="${text}"]

user gets accordion header button element
    [Arguments]  ${heading_text}  ${parent}=css:[data-testid="accordion"]
    ${button}=  get child element  ${parent}  xpath:.//button[@aria-expanded and contains(., "${heading_text}")]
    [Return]  ${button}

user opens accordion section
    [Arguments]  ${heading_text}  ${parent}=css:[data-testid="accordion"]
    ${header_button}=  user gets accordion header button element  ${heading_text}  ${parent}
    ${is_expanded}=  get element attribute  ${header_button}  aria-expanded
    run keyword if  '${is_expanded}' != 'true'  user clicks element  ${header_button}
    user checks element attribute value should be  ${header_button}  aria-expanded  true

user closes accordion section
    [Arguments]  ${heading_text}  ${parent}=css:[data-testid="accordion"]
    ${header_button}=  user gets accordion header button element  ${heading_text}  ${parent}
    ${is_expanded}=  get element attribute  ${header_button}  aria-expanded
    run keyword if  '${is_expanded}' != 'false'  user clicks element  ${header_button}
    user checks element attribute value should be  ${header_button}  aria-expanded  false

user gets accordion section content element
    [Arguments]  ${heading_text}  ${parent}=css:[data-testid="accordion"]
    ${header_button}=  user gets accordion header button element  ${heading_text}  ${parent}
    ${content_id}=  get element attribute  ${header_button}  id
    ${content}=  get child element  ${parent}  css:[aria-labelledby="${content_id}"]
    [Return]  ${content}

user scrolls to accordion section content
    [Arguments]  ${heading_text}  ${parent}=css:[data-testid="accordion"]
    ${content}=  user gets accordion section content element  ${heading_text}  ${parent}
    user scrolls to element  ${content}
    # Workaround to get lazy loaded data blocks to render
    user scrolls down  1

user waits until page contains testid
    [Arguments]  ${id}   ${wait}=${timeout}
    user waits until page contains element   css:[data-testid="${id}"]   ${wait}

user checks page does not contain testid
    [Arguments]  ${id}
    user checks page does not contain element   css:[data-testid="${id}"]

user checks testid element contains
    [Arguments]  ${id}  ${text}
    user waits until element contains  css:[data-testid="${id}"]   ${text}

user checks element does not contain
    [Arguments]   ${element}    ${text}
    element should not contain    ${element}    ${text}

user waits until element is visible
    [Arguments]    ${selector}    ${wait}=${timeout}
    wait until element is visible  ${selector}   timeout=${wait}

user checks element is visible
    [Arguments]   ${element}
    element should be visible   ${element}

user checks element is not visible
    [Arguments]   ${element}
    element should not be visible   ${element}

user waits until element is enabled
    [Arguments]   ${element}
    wait until element is enabled   ${element}

user checks element is enabled
    [Arguments]   ${element}
    element should be enabled   ${element}

user checks element is disabled
    [Arguments]   ${element}
    element should be disabled   ${element}

user checks element should contain
    [Arguments]   ${element}  ${text}
    element should contain  ${element}    ${text}

user checks element should not contain
    [Arguments]   ${element}  ${text}
    element should not contain  ${element}    ${text}

user checks input field contains
    [Arguments]  ${element}  ${text}
    page should contain textfield  ${element}
    textfield value should be  ${element}  ${text}

user checks page contains
    [Arguments]   ${text}
    page should contain   ${text}

user checks page does not contain
    [Arguments]  ${text}
    page should not contain   ${text}

user checks page contains element
    [Arguments]  ${element}
    page should contain element  ${element}

user checks page does not contain element
    [Arguments]  ${element}
    page should not contain element  ${element}

user clicks element
    [Arguments]     ${element}
    wait until page contains element  ${element}
    user scrolls to element  ${element}
    wait until element is enabled   ${element}
    click element   ${element}

user clicks testid element
    [Arguments]  ${id}
    user clicks element  css:[data-testid="${id}"]

user clicks link
    [Arguments]   ${text}  ${parent}=css:body
    user waits until parent contains element  ${parent}  link:${text}
    ${element}=  get child element  ${parent}  link:${text}
    user clicks element  ${element}

user clicks button
    [Arguments]   ${text}  ${parent}=css:body
    ${button}=  user gets button element  ${text}  ${parent}
    user clicks element  ${button}

user waits until page contains button
    [Arguments]  ${text}
    user waits until page contains element  xpath://button[text()="${text}"]

user checks page does not contain button
    [Arguments]  ${text}
    user checks page does not contain element  xpath://button[text()="${text}"]

user waits until page does not contain button
    [Arguments]   ${text}
    user waits until page does not contain element  xpath://button[text()="${text}"]

user waits until button is enabled
    [Arguments]   ${text}
    user waits until element is enabled  xpath://button[text()="${text}"]

user gets button element
    [Arguments]   ${text}  ${parent}=css:body
     user waits until parent contains element  ${parent}  xpath:.//button[text()="${text}"]
     ${button}=  get child element  ${parent}  xpath:.//button[text()="${text}"]
     [Return]  ${button}

user checks page contains tag
    [Arguments]   ${text}
    user checks page contains element  xpath://*[contains(@class, "govuk-tag")][text()="${text}"]

user waits until h1 is visible
    [Arguments]   ${text}  ${wait}=${timeout}
    user waits until element is visible  xpath://h1[text()="${text}"]  ${wait}

user waits until h2 is visible
    [Arguments]   ${text}  ${wait}=${timeout}
    user waits until element is visible  xpath://h2[text()="${text}"]  ${wait}

user waits until h3 is visible
    [Arguments]   ${text}  ${wait}=${timeout}
    user waits until element is visible  xpath://h3[text()="${text}"]  ${wait}

user waits until page contains title
    [Arguments]   ${text}  ${wait}=${timeout}
    user waits until page contains element   xpath://h1[@data-testid="page-title" and text()="${text}"]   ${wait}

user waits until page contains title caption
    [Arguments]  ${text}  ${wait}=${timeout}
    user waits until page contains element  xpath://span[@data-testid="page-title-caption" and text()="${text}"]  ${wait}

user selects newly opened window
    select window   NEW

user checks element attribute value should be
    [Arguments]   ${locator}  ${attribute}    ${expected}
    element attribute value should be  ${locator}  ${attribute}  ${expected}

user checks element value should be
    [Arguments]  ${locator}  ${value}
    element attribute value should be  ${locator}  value  ${value}

user checks textarea contains
    [Arguments]   ${selector}   ${text}
    textarea should contain   ${selector}   ${text}

user checks radio option for "${radiogroupId}" should be "${expectedLabelText}"
    user checks page contains element  css:#${radiogroupId} [data-testid="${expectedLabelText}"]:checked

user checks summary list contains
    [Arguments]  ${term}    ${description}   ${parent}=css:body  ${wait}=${timeout}
    user waits until parent contains element  ${parent}  xpath:.//dl//dt[contains(text(), "${term}")]/following-sibling::dd[contains(., "${description}")]    timeout=${wait}
    ${element}=  get child element  ${parent}  xpath:.//dl//dt[contains(text(), "${term}")]/following-sibling::dd[contains(., "${description}")]
    user waits until element is visible  ${element}

user selects from list by label
    [Arguments]   ${locator}   ${label}
    user waits until element is visible  ${locator}
    select from list by label   ${locator}   ${label}

user chooses file
    [Arguments]  ${locator}  ${file_path}
    user waits until element is visible  ${locator}
    choose file  ${locator}  ${file_path}

user clears element text
    [Arguments]   ${selector}
    user presses keys   CTRL+a+BACKSPACE  ${selector}
    sleep  0.1

user presses keys
    [Arguments]   ${keys}   ${selector}=${EMPTY}
    run keyword if  '${selector}' != '${EMPTY}'
    ...  run keywords
    ...  user waits until page contains element  ${selector}
    ...  AND  user waits until element is visible   ${selector}
    ...  AND  user sets focus to element  ${selector}
    ...  AND  user clicks element  ${selector}
    press keys   ${NONE}    ${keys}   # No selector as sometimes leads to text not being input
    sleep  0.1

user enters text into element
    [Arguments]   ${selector}   ${text}
    user clears element text  ${selector}
    user presses keys   ${text}   ${selector}

user checks element count is x
    [Arguments]   ${locator}   ${amount}
    page should contain element   ${locator}   limit=${amount}

user checks url contains
    [Arguments]   ${text}
    ${current_url}=   get location
    should contain  ${current_url}   ${text}

user checks page contains link with text and url
    [Arguments]  ${text}  ${href}
    user checks page contains element  xpath://a[@href="${href}" and text()="${text}"]

user checks link has url
    [Arguments]  ${link}  ${url}  ${parent}=css:body
    user waits until parent contains element  ${parent}  xpath://a[@href="${url}" and text()="${link}"]

user opens details dropdown
    [Arguments]  ${text}  ${parent}=css:body
    user waits until parent contains element  ${parent}  xpath:.//details/summary[contains(., "${text}") and @aria-expanded]
    ${summary}=  get child element  ${parent}  xpath:.//details/summary[contains(., "${text}")]
    user waits until element is visible  ${summary}
    ${is_expanded}=  get element attribute  ${summary}  aria-expanded
    run keyword if  '${is_expanded}' != 'true'  user clicks element  ${summary}
    user checks element attribute value should be  ${summary}  aria-expanded  true

user closes details dropdown
    [Arguments]  ${text}  ${parent}=css:body
    user waits until parent contains element  ${parent}  xpath:.//details/summary[contains(., "${text}") and @aria-expanded]
    ${summary}=  get child element  ${parent}  xpath:.//details/summary[contains(., "${text}")]
    user waits until element is visible  ${summary}
    ${is_expanded}=  get element attribute  ${summary}  aria-expanded
    run keyword if  '${is_expanded}' != 'false'  user clicks element  ${summary}
    user checks element attribute value should be  ${summary}  aria-expanded  false

user gets details content element
    [Arguments]  ${text}  ${parent}=css:body
    user waits until parent contains element  ${parent}  xpath:.//details/summary[contains(., "${text}")]
    ${summary}=  get child element  ${parent}  xpath:.//details/summary[contains(., "${text}")]
    ${content_id}=  get element attribute  ${summary}  aria-controls
    ${content}=  get child element  ${parent}  id:${content_id}
    [Return]  ${content}

user waits until details contains element
    [Arguments]  ${text}  ${element}  ${parent}=css:body  ${wait}=${timeout}
    ${details}=  user gets details content element  ${text}  ${parent}
    user waits until parent contains element  ${details}  ${element}  timeout=${wait}

user waits until details contains link
    [Arguments]  ${text}  ${link}  ${parent}=css:body
    user waits until details contains element  ${text}  link:${link}  ${parent}

user checks publication bullet contains link
    [Arguments]   ${publication}   ${link}
    user checks page contains element  xpath://details[@open]//*[text()="${publication}"]/..//a[text()="${link}"]

user checks publication bullet does not contain link
    [Arguments]   ${publication}   ${link}
    user checks page does not contain element  xpath://details[@open]//*[text()="${publication}"]/..//a[text()="${link}"]

user checks key stat contents
    [Arguments]   ${tile}  ${title}  ${value}  ${summary}  ${wait}=${timeout}
    user waits until element is visible  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-title"]  ${wait}
    user waits until element contains  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-title"]  ${title}
    user waits until element contains  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-value"]  ${value}
    user waits until element contains  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-summary"]  ${summary}

user checks key stat definition
    [Arguments]   ${tile}  ${definition_summary}  ${definition}
    user opens details dropdown  ${definition_summary}  css:[data-testid="keyStat"]:nth-of-type(${tile})
    user waits until element is visible  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-definition"]
    user checks element should contain  css:[data-testid="keyStat"]:nth-of-type(${tile}) [data-testid="keyStat-definition"]  ${definition}

user clicks radio
    [Arguments]  ${label}
    user clicks element  xpath://label[text()="${label}"]/../input[@type="radio"]

user checks radio is checked
    [Arguments]  ${label}
    user checks page contains element  xpath://label[text()="${label}"]/../input[@type="radio" and @checked]

user clicks checkbox
    [Arguments]  ${label}
    user scrolls to element  xpath://label[text()="${label}" or strong[text()="${label}"]]/../input[@type="checkbox"]
    user clicks element  xpath://label[text()="${label}" or strong[text()="${label}"]]/../input[@type="checkbox"]

user checks checkbox is checked
    [Arguments]    ${label}
    user checks checkbox input is checked  xpath://label[text()="${label}" or strong[text()="${label}"]]/../input[@type="checkbox"]

user checks checkbox is not checked
    [Arguments]    ${label}
    user checks checkbox input is not checked  xpath://label[text()="${label}" or strong[text()="${label}"]]/../input[@type="checkbox"]

user checks checkbox input is checked
    [Arguments]    ${selector}
    user waits until page contains element  ${selector}
    checkbox should be selected   ${selector}

user checks checkbox input is not checked
    [Arguments]    ${selector}
    user waits until page contains element  ${selector}
    checkbox should not be selected   ${selector}

user checks breadcrumb count should be
    [Arguments]  ${count}
    user waits until page contains element  css:[data-testid="breadcrumbs--list"] li   limit=${count}

user checks nth breadcrumb contains
    [Arguments]   ${num}   ${text}
    user checks element should contain   css:[data-testid="breadcrumbs--list"] li:nth-child(${num})   ${text}

user checks page contains other release
    [Arguments]   ${other_release_title}
    user checks page contains element   xpath://li[@data-testid="other-release-item"]/a[text()="${other_release_title}"]

user checks page does not contain other release
    [Arguments]   ${other_release_title}
    user checks page does not contain element   xpath://li[@data-testid="other-release-item"]/a[text()="${other_release_title}"]
