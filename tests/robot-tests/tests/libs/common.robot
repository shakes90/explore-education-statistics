*** Settings ***
Library     SeleniumLibrary  timeout=${timeout}  implicit_wait=${implicit_wait}  run_on_failure=do this on failure
Library     OperatingSystem
#Library     XvfbRobot           # sudo apt install xvfb + pip install robotframework-xvfb

#Library    email_guerrillamail.py
Library    file_operations.py
Library    utilities.py

*** Variables ***
${browser}    chrome
${headless}   1

${timeout}          30
${implicit_wait}    3

*** Keywords ***
do this on failure
  capture large screenshot
  set selenium timeout  3

set to local storage
  [Arguments]    ${key}   ${value}
  execute javascript  localStorage.setItem('${key}', '${value}');

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
  execute javascript      window.scrollTo(0, 0);

user scrolls to element
  [Arguments]  ${element}
  scroll element into view  ${element}

user mouses over element
    [Arguments]  ${element}
    mouse over  ${element}

user waits until page contains
  [Arguments]    ${pageText}    ${wait}=${timeout}
  wait until page contains   ${pageText}    timeout=${wait}

user waits until page contains element
  [Arguments]    ${element}        ${wait}=${timeout}
  wait until page contains element  ${element}   timeout=${wait}

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
  wait until page contains element  xpath://a[text()="${link_text}"]   timeout=${wait}

user waits until page contains accordion section
  [Arguments]   ${section_title}     ${wait}=${timeout}
  user waits until page contains element  xpath://*[contains(@class,"govuk-accordion__section-button") and text()="${section_title}"]    ${wait}

user waits until page does not contain accordion section
  [Arguments]   ${section_title}     ${wait}=${timeout}
  user waits until page does not contain element  xpath://*[contains(@class,"govuk-accordion__section-button") and text()="${section_title}"]    ${wait}

user checks element contains
  [Arguments]   ${element}    ${text}
  wait until element contains  ${element}    ${text}
  element should contain    ${element}    ${text}

user checks testid element contains
    [Arguments]  ${id}  ${text}
    user checks element contains  css:[data-testid="${id}"]   ${text}

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
  [Arguments]   ${text}
  wait until element is visible   link:${text}
  user scrolls to element  link:${text}
  wait until element is enabled  link:${text}
  click link  ${text}

user clicks button
  [Arguments]   ${text}
  user waits until element is visible  xpath://button[text()="${text}"]
  user waits until element is enabled  xpath://button[text()="${text}"]
  click button  ${text}

user waits until page contains button
  [Arguments]  ${text}
  user waits until page contains element  xpath://button[text()="${text}"]

user checks page does not contain button
  [Arguments]  ${text}
  user checks page does not contain element  xpath://button[text()="${text}"]

user waits until button is enabled
  [Arguments]   ${text}
  user waits until element is enabled  xpath://button[text()="${text}"]

user checks page contains tag
  [Arguments]   ${text}
  user checks page contains element  xpath://*[contains(@class, "govuk-tag")][text()="${text}"]

user waits until page contains heading 1
  [Arguments]   ${text}  ${wait}=${timeout}
  user waits until element is visible  xpath://h1[text()="${text}"]  ${wait}

user waits until page contains heading 2
  [Arguments]   ${text}  ${wait}=${timeout}
  user waits until element is visible  xpath://h2[text()="${text}"]  ${wait}

user waits until page contains heading 3
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
  element attribute value should be  ${locator}     ${attribute}   ${expected}

user checks radio option for "${radiogroupId}" should be "${expectedLabelText}"
  user checks page contains element  css:#${radiogroupId} [data-testid="${expectedLabelText}"]:checked

user checks summary list contains
    [Arguments]  ${term}    ${description}
    user waits until element is visible  xpath://dl//dt[contains(text(), "${term}")]/following-sibling::dd[contains(., "${description}")]

user selects from list by label
  [Arguments]   ${locator}   ${label}
  user waits until element is visible  ${locator}
  select from list by label   ${locator}   ${label}

user chooses file
    [Arguments]  ${locator}  ${file_path}
    user waits until element is visible  ${locator}
    choose file  ${locator}  ${file_path}

user clears element text
  [Arguments]   ${locator}
  press keys  ${locator}  CTRL+a+BACKSPACE
  sleep  0.1

user presses keys
  [Arguments]   ${keys}
  press keys  ${None}    ${keys}
  sleep  0.1

user enters text into element
  [Arguments]   ${selector}   ${text}
  user waits until page contains element  ${selector}
  user clears element text  ${selector}
  user clicks element   ${selector}
  user presses keys  ${text}

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

user checks page contains details section
  [Arguments]  ${text}
  user checks page contains element  css:[data-testid="Expand Details Section ${text}"]

user opens details section
  [Arguments]  ${text}
  user clicks element    css:[data-testid="Expand Details Section ${text}"]

user waits until results table appears
  # Extra timeout until EES-234
  [Arguments]   ${wait_time}
  user waits until page contains element   css:table thead th    ${wait_time}
  user waits until page does not contain element  css:[class^="dfe-LoadingSpinner"]

user logs into microsoft online
  [Arguments]  ${email}   ${password}
  user waits until page contains element  xpath://div[text()="Sign in"]
  sleep  1
  user presses keys     ${email}
  user waits until page contains element    css:input[value="Next"]
  wait until element is enabled   css:input[value="Next"]
  user clicks element   css:input[value="Next"]

  user waits until page contains element  xpath://div[text()="Enter password"]
  sleep  1
  user presses keys     ${password}
  user waits until page contains element    css:input[value="Sign in"]
  wait until element is enabled   css:input[value="Sign in"]
  user clicks element   css:input[value="Sign in"]

  user waits until page contains element  xpath://div[text()="Stay signed in?"]
  user waits until page contains element    css:input[value="No"]
  wait until element is enabled   css:input[value="No"]
  sleep  1
  user clicks element   css:input[value="No"]

user checks publication bullet contains link
  [Arguments]   ${publication}   ${link}
  user checks page contains element  xpath://details[@open]//*[text()="${publication}"]/..//a[text()="${link}"]

user checks publication bullet does not contain link
  [Arguments]   ${publication}   ${link}
  user checks page does not contain element  xpath://details[@open]//*[text()="${publication}"]/..//a[text()="${link}"]

user waits until page contains key stat tile
  [Arguments]  ${title}   ${value}   ${wait}=${timeout}
  user waits until page contains element   xpath://*[@data-testid="keyStatTile-title" and text()="${title}"]/../*[@data-testid="keyStatTile-value" and text()="${value}"]    ${wait}

user clicks radio
    [Arguments]  ${label}
    user clicks element  xpath://label[text()="${label}"]/../input[@type="radio"]

user checks radio is checked
    [Arguments]  ${label}
    user checks page contains element  xpath://label[text()="${label}"]/../input[@type="radio" and @checked]

user clicks checkbox
    [Arguments]  ${label}
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

user clicks indicator checkbox
    [Arguments]  ${indicator_label}
    user clicks element  xpath://*[@id="filtersForm-indicators"]//label[text()="${indicator_label}"]

user checks indicator checkbox is checked
    [Arguments]  ${indicator_label}
    user checks checkbox input is checked  xpath://*[@id="filtersForm-indicators"]//label[contains(text(), "${indicator_label}")]/../input[@type="checkbox"]

user clicks subheaded indicator checkbox
    [Arguments]  ${subheading_label}   ${indicator_label}
    user clicks element  xpath://*[@id="filtersForm-indicators"]//legend[text()="${subheading_label}"]/..//label[text()="${indicator_label}"]/../input[@type="checkbox"]

user checks subheaded indicator checkbox is checked
    [Arguments]  ${subheading_label}  ${indicator_label}
    user checks checkbox input is checked  xpath://*[@id="filtersForm-indicators"]//legend[text()="${subheading_label}"]/..//label[text()="${indicator_label}"]/../input[@type="checkbox"]

user clicks category checkbox
    [Arguments]  ${subheading_label}  ${category_label}
    user clicks element  xpath://legend[text()="${subheading_label}"]/..//label[text()="${category_label}"]/../input[@type="checkbox"]

user checks category checkbox is checked
    [Arguments]  ${subheading_label}  ${category_label}
    user checks checkbox input is checked  xpath://legend[text()="${subheading_label}"]/..//label[text()="${category_label}"]/../input[@type="checkbox"]

user clicks select all for category
    [Arguments]  ${category_label}
    user clicks element  xpath://legend[text()="{category_label}"]/..//button[contains(text(), "Select")]

  
