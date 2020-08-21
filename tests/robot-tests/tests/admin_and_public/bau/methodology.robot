*** Settings ***
Resource    ../../libs/admin-common.robot

Force Tags  Admin  Local  Dev  AltersData  Footnotes

Suite Setup       user signs in as bau1
Suite Teardown    user closes the browser

*** Variables ***
${TOPIC_NAME}        %{TEST_TOPIC_NAME}
${METHODOLOGY_NAME}  UI tests - Methodology %{RUN_IDENTIFIER}

*** Test Cases ***
Navigate to Manage methodologies
    [Tags]  HappyPath
    user waits until page contains link    manage methodologies
    user clicks link  manage methodologies

Create new Methodology
    [Tags]  HappyPath
    user waits until page contains button  Create new methodology
    user clicks button  Create new methodology
    user waits until page contains element  css:createMethodologyForm-title
    user enters text into element  css:#createMethodologyForm-title  ${METHODOLOGY_NAME}
    user clicks button  Create methodology

# Navigate to created methodology
#     [Tags]  HappyPath
#     user waits until page contains link  Draft methodologies
#     user clicks link  Draft methodologies
#     user waits until page contains link  ${METHODOLOGY_NAME}
#     user clicks link  ${METHODOLOGY_NAME}

Add methodology content
    [Tags]  HappyPath
    user waits until page contains link  Manage content
    user clicks link  Manage content
    user waits until page contains button  Add new section
    user clicks button  Add new section
    user clicks button  New section
    user watis until page contains button  Add text block
    user clicks button  Add text block
    user waits until page contains button  Edit block
    user clicks button  Edit block
    user presses keys  This is some default text 
    user clicks button  Save
    user clicks button  Edit section title
    user enters text into element  css:#heading  Default section title
    user clicks button  Save section title



Sleep
    sleep  999999