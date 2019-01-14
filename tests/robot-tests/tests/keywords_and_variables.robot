*** Settings ***
Library     SeleniumLibrary  timeout=${timeout}  implicit_wait=${implicit_wait}
Library     OperatingSystem
#Library     XvfbRobot           # sudo apt install xvfb + pip install robotframework-xvfb

Library    library.py

*** Variables ***
${browser}    chrome
${url}        http://localhost:3000
${headless}   1
${timeout}    0.25
${implicit_wait}   0.25


*** Keywords ***
setup configuration
  install chromedriver
  add lib dir to path  # Need chromedriver to run selenium!

user opens the browser
  setup configuration
  run keyword if    "${browser}" == "chrome"    user opens chrome
  run keyword if    "${browser}" == "firefox"   user opens firefox
  go to    about:blank

user opens chrome
  run keyword if    ${headless} == 1      user opens chrome headless
  #run keyword if    ${headless} == 1      user opens chrome with xvfb
  run keyword if    ${headless} == 0      user opens chrome without xvfb

user opens firefox
  run keyword if    ${headless} == 1      user opens firefox headless
  #run keyword if    ${headless} == 1      user opens firefox with xvfb
  run keyword if    ${headless} == 0      user opens firefox without xvfb

# Requires chromedriver v2.31+ -- you can alternatively use "user opens chrome with xvfb"
user opens chrome headless
  ${c_opts} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
  Call Method    ${c_opts}   add_argument    headless
  Call Method    ${c_opts}   add_argument    disable-gpu
  #Call Method    ${c_opts}   add_argument    no-sandbox
  Call Method    ${c_opts}   add_argument    window-size\=1920,1080
  Create Webdriver    Chrome    crm_alias    chrome_options=${c_opts}

user opens chrome with xvfb
  start virtual display   1920    1080
  ${options}=    evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys

  # --no-sandbox allows chrome to run in a docker container: https://github.com/jessfraz/dockerfiles/issues/149
  run keyword if    ${docker} == 1     Call Method   ${options}   add_argument  --no-sandbox

  create webdriver    Chrome   chrome_options=${options}
  set window size    1920    1080

user opens chrome without xvfb
  open browser   about:blank   Chrome
  maximize browser window

  # bug workaround to maximize window: https://github.com/robotframework/Selenium2Library/issues/677
  #${options}  evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys
  #call method  ${options}  add_argument  --start-fullscreen
  #create webdriver  Chrome  chrome_options=${options}

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

user scrolls to the top of the page
  execute javascript      window.scrollTo(0, 0);

user waits until page contains
  [Arguments]    ${pageText}
  wait until page contains   ${pageText}

user waits until page contains element
  [Arguments]    ${pageText}
  wait until page contains element  ${pageText}

user waits until page does not contain element
  [Arguments]    ${pageText}
  wait until page does not contain element  ${pageText}

user waits until element contains
  [Arguments]    ${element}    ${text}
  wait until element contains    ${element}    ${text}

user checks element contains
  [Arguments]   ${element}    ${text}
  element should contain    ${element}    ${text}

user checks element does not contain
  [Arguments]   ${element}    ${text}
  element should not contain    ${element}    ${text}

user waits until element is visible
  [Arguments]    ${pageText}
  wait until element is visible  ${pageText}

user checks element is visible
  [Arguments]   ${element}
  element should be visible   ${element}

user checks checkbox is selected
  [Arguments]    ${checkbox}
  checkbox should be selected   ${checkbox}

user checks checkbox is not selected
  [Arguments]    ${checkbox}
  checkbox should not be selected   ${checkbox}

user waits until element is enabled
  [Arguments]   ${element}
  wait until element is enabled   ${element}

user checks element is enabled
  [Arguments]   ${element}
  element should be enabled   ${element}

user checks element is disabled
  [Arguments]   ${element}
  element should be disabled   ${element}

user clicks element
  [Arguments]     ${elementToClick}
  wait until page contains element  ${elementToClick}
  set focus to element    ${elementToClick}
  click element   ${elementToClick}

user clicks link
  [Arguments]   ${text}
  click link  ${text}

verify element should contain
  [Arguments]   ${element}  ${text}
  element should contain  ${element}    ${text}

verify element should not contain
  [Arguments]   ${element}  ${text}
  element should not contain  ${element}    ${text}

verify page should contain element
  [Arguments]  ${element}
  page should contain element  ${element}

verify page should not contain element
  [Arguments]  ${element}
  page should not contain element  ${element}
