*** Settings ***
Resource    ../../libs/admin-common.robot

Force Tags  Admin  Local  Dev  AltersData  Footnotes

Suite Setup       user signs in as bau1
Suite Teardown    user closes the browser

*** Variables ***
${TOPIC_NAME}        %{TEST_TOPIC_NAME}
${PUBLICATION_NAME}  UI tests - footnotes %{RUN_IDENTIFIER}
${SUBJECT_NAME}      UI test subject

${DATA_FILE_NAME}  footnotes_dates

${FOOTNOTE_TEXT_1}  test footnote text (will be deleted)
${FOOTNOTE_TEXT_2}  A test footnote
${FOOTNOTE_TEXT_3}  A edited test footnote!

${FOOTNOTE_DATABLOCK_NAME}  test data block (footnotes)

*** Keywords ***
user clicks footnote checkbox
    [Arguments]  ${label}
    wait until page contains element  xpath://*[@id="create-footnote-form"]//label[text()="${label}"]/../input
    page should contain checkbox  xpath://*[@id="create-footnote-form"]//label[text()="${label}"]/../input
    user scrolls to element   xpath://*[@id="create-footnote-form"]//label[text()="${label}"]/../input
    wait until element is enabled   xpath://*[@id="create-footnote-form"]//label[text()="${label}"]/../input
    user clicks element     xpath://*[@id="create-footnote-form"]//label[text()="${label}"]/../input

user checks footnote checkbox is selected
  [Arguments]  ${label}
  wait until element is enabled   xpath://*[@id="create-footnote-form"]//label[contains(text(), "${label}")]/../input
  checkbox should be selected     xpath://*[@id="create-footnote-form"]//label[contains(text(), "${label}")]/../input

*** Test Cases ***
Create new publication for "UI tests topic" topic
    [Tags]  HappyPath
    user selects theme "Test theme" and topic "${TOPIC_NAME}" from the admin dashboard
    user waits until page contains link    Create new publication
    user checks page does not contain button   ${PUBLICATION_NAME}
    user clicks link  Create new publication
    user creates publication   ${PUBLICATION_NAME}

Verify new publication
    [Tags]  HappyPath
    user selects theme "Test theme" and topic "${TOPIC_NAME}" from the admin dashboard
    user waits until page contains button  ${PUBLICATION_NAME}

Create new release
    [Tags]  HappyPath
    user opens accordion section  ${PUBLICATION_NAME}
    user clicks element  css:[data-testid="Create new release link for ${PUBLICATION_NAME}"]
    user creates release for publication  ${PUBLICATION_NAME}  Financial Year  3000

Verify release summary
    [Tags]  HappyPath
    user checks page contains element   xpath://li/a[text()="Release summary" and contains(@aria-current, 'page')]
    user waits until page contains heading 2  Release summary
    user checks summary list contains  Publication title  ${PUBLICATION_NAME}

Upload subject
    [Tags]  HappyPath
    user clicks link  Manage data
    user waits until page contains element  css:#dataFileUploadForm-subjectTitle
    user enters text into element  css:#dataFileUploadForm-subjectTitle   ${SUBJECT_NAME}
    choose file   css:#dataFileUploadForm-dataFile       ${CURDIR}${/}files${/}${DATA_FILE_NAME}.csv
    choose file   css:#dataFileUploadForm-metadataFile   ${CURDIR}${/}files${/}${DATA_FILE_NAME}.meta.csv
    user clicks button  Upload data files

    user waits until page contains heading 2  Uploaded data files
    user waits until page contains accordion section   ${SUBJECT_NAME}
    user opens accordion section   ${SUBJECT_NAME}
    user checks page contains element   xpath://dt[text()="Subject title"]/../dd/h4[text()="${SUBJECT_NAME}"]
    user waits until page contains element  xpath://dt[text()="Status"]/../dd//strong[text()="Complete"]     180

Open footnotes tab
    [Tags]  HappyPath
    user clicks link  Footnotes

Create footnote
    [Tags]  HappyPath
    user clicks element  css:#add-footnote-button
    user opens details dropdown  Indicators
    user opens details dropdown  Date
    user clicks footnote checkbox  Number of open settings
    user checks footnote checkbox is selected  Number of open settings
    user clicks footnote checkbox  01/04/2020
    user checks footnote checkbox is selected  01/04/2020
    user enters text into element  css:#create-footnote-form-content  ${FOOTNOTE_TEXT_1}
    user clicks button  Create footnote

Create another footnote
    [Tags]  HappyPath
    user clicks element  css:#add-footnote-button
    user opens details dropdown  Indicators
    user opens details dropdown  Date
    user clicks footnote checkbox  Proportion of settings open
    user checks footnote checkbox is selected  Proportion of settings open
    user clicks footnote checkbox  01/04/2021
    user checks footnote checkbox is selected  01/04/2021
    user enters text into element  css:#create-footnote-form-content  ${FOOTNOTE_TEXT_2}    
    user clicks button  Create footnote

Confirm created footnotes
    [tags]  HappyPath
    user waits until page contains  ${FOOTNOTE_TEXT_1}
    user waits until page contains  ${FOOTNOTE_TEXT_2}

Open Manage data blocks tab
    [Tags]  HappyPath
    user clicks link  Manage data blocks

Navigate to Manage data blocks tab
    [Tags]  HappyPath
    user clicks link    Manage data blocks
    user waits until page contains heading 2   Choose a subject

Select subject "${SUBJECT_NAME}"
    [Tags]  HappyPath
    user waits until page contains   ${SUBJECT_NAME}
    user selects radio    ${SUBJECT_NAME}
    user clicks element   css:#publicationSubjectForm-submit

Select locations
    [Tags]   HappyPath
    user waits until page contains heading 2  Choose locations
    user opens details dropdown   National
    user clicks checkbox   England
    user clicks element     css:#locationFiltersForm-submit

Select time period
    [Tags]   HappyPath
    user waits until page contains heading 2  Choose time period
    user selects start date    2020 Week 13
    user selects end date      2021 Week 24
    user clicks element     css:#timePeriodForm-submit

Select indicators
    [Tags]  HappyPath
    user waits until page contains heading 2  Choose your filters
    user clicks button  Select all 2 subgroup options

Select category filters
    [Tags]  HappyPath
    user opens category filters details section  Date
    user clicks category filters checkbox    01/04/2020
    user checks category filters checkbox is selected  01/04/2020
    user clicks category filters checkbox    01/04/2021
    user checks category filters checkbox is selected  01/04/2021

Create table
    [Tags]  HappyPath
    user clicks element   css:#filtersForm-submit
    user waits until results table appears     180

Check footnotes in table preview
    user checks page contains  ${FOOTNOTE_TEXT_1}
    user checks page contains  ${FOOTNOTE_TEXT_2}

Save data block
    [Tags]  HappyPath
    user enters text into element  css:#dataBlockDetailsForm-name  ${FOOTNOTE_DATABLOCK_NAME}
    user enters text into element  css:#dataBlockDetailsForm-heading  ${FOOTNOTE_DATABLOCK_NAME}
    user clicks button  Save data block
    user waits until page contains element  xpath://h2[text()="${FOOTNOTE_DATABLOCK_NAME}"]

Go back and delete a footnote
    [tags]  HappyPath
    user clicks link  Manage data
    user clicks link  Footnotes
    user clicks button  Delete
    user clicks button  Confirm
    user waits until page does not contain  ${FOOTNOTE_TEXT_1}
    user checks page contains  ${FOOTNOTE_TEXT_2}

Add data block to release
    [tags]  HappyPath
    user clicks link  Manage content
    user clicks button  Add secondary stats
    user waits until page contains element  css:#datablock_select
    user selects from list by label  css:#datablock_select  ${FOOTNOTE_DATABLOCK_NAME}
    user clicks button  Embed
    user waits until page contains link  Table
    user clicks link  Table
    user checks page contains  ${FOOTNOTE_TEXT_2}
    user checks page does not contain  ${FOOTNOTE_TEXT_1}

Edit footnote
    [tags]  HappyPath
    user clicks link  Manage data
    user waits until page contains link  Footnotes
    user clicks link  Footnotes
    user waits until page contains button  Edit
    user clicks button  Edit
    user enters text into element  css:.govuk-textarea  ${FOOTNOTE_TEXT_3}
    user clicks button  Update footnote
    user waits until page contains  ${FOOTNOTE_TEXT_3}
    user checks page does not contain  ${FOOTNOTE_TEXT_2}

Check footnote was updated
    [tags]  HappyPath
    user clicks link  Manage content
    user waits until page contains link  Table  180
    user clicks link  Table
    user checks page contains  ${FOOTNOTE_TEXT_3}
    user checks page does not contain  ${FOOTNOTE_TEXT_2}
    user checks page does not contain  ${FOOTNOTE_TEXT_1}

Check footnote in Preview content mode
    [tags]  HappyPath
    user clicks element   css:#pageMode-preview
    user checks page contains  ${FOOTNOTE_TEXT_3}
    user checks page does not contain  ${FOOTNOTE_TEXT_2}
    user checks page does not contain  ${FOOTNOTE_TEXT_1}

# Stolen from publish_release.robot 
Go to "Release status" tab
    [Tags]  HappyPath
    user clicks link   Release status
    user waits until page contains heading 2  Release status
    user waits until page contains button  Edit release status

Approve release
    [Tags]  HappyPath
    ${PUBLISH_DATE_DAY}=  get datetime  %d
    ${PUBLISH_DATE_MONTH}=  get datetime  %m
    ${PUBLISH_DATE_MONTH_WORD}=  get datetime  %B
    ${PUBLISH_DATE_YEAR}=  get datetime  %Y
    set suite variable  ${PUBLISH_DATE_DAY}
    set suite variable  ${PUBLISH_DATE_MONTH}
    set suite variable  ${PUBLISH_DATE_MONTH_WORD}
    set suite variable  ${PUBLISH_DATE_YEAR}

    user clicks button  Edit release status
    user waits until page contains heading 2  Edit release status

    user clicks element   css:input[data-testid="Approved for publication"]
    user enters text into element  id:releaseStatusForm-internalReleaseNote  Approved by UI tests
    user clicks element  css:input[data-testid="As soon as possible"]
    user enters text into element  id:releaseStatusForm-nextReleaseDate-month   12
    user enters text into element  id:releaseStatusForm-nextReleaseDate-year    3001

    user clicks button   Update status

Verify release is scheduled
    [Tags]  HappyPath
    user waits until page contains heading 2  Release status
    user checks summary list contains  Current status  Approved
    user checks summary list contains  Scheduled release  ${PUBLISH_DATE_DAY} ${PUBLISH_DATE_MONTH_WORD} ${PUBLISH_DATE_YEAR}
    user checks summary list contains  Next release expected  December 3001

Wait for release process status to be Complete
    [Tags]  HappyPath
    # EES-1007 - Release process status doesn't automatically update
    user waits for release process status to be  Complete    900
    user checks page does not contain button  Edit release status

User goes to public Find Statistics page
    [Tags]  HappyPath
    environment variable should be set   PUBLIC_URL
    user goes to url   %{PUBLIC_URL}/find-statistics
    user waits until page contains heading 1  Find statistics and data
    user waits for page to finish loading

Verify newly published release is on Find Statistics page
    [Tags]  HappyPath
    user checks page contains accordion   Test theme
    user opens accordion section  Test theme
    user checks accordion section contains text   Test theme   ${TOPIC_NAME}

    user opens details dropdown  ${TOPIC_NAME}
    user waits until details dropdown contains publication    ${TOPIC_NAME}  ${PUBLICATION_NAME}   10
    user checks publication bullet contains link   ${PUBLICATION_NAME}  View statistics and data
    user checks publication bullet contains link   ${PUBLICATION_NAME}  Create your own tables online
    user checks publication bullet does not contain link  ${PUBLICATION_NAME}   Statistics at DfE

Navigate to newly published release page
    [Tags]  HappyPath
    user clicks element   css:[data-testid="view-stats-ui-tests-footnotes-%{RUN_IDENTIFIER}"]
    user waits until page contains heading 1  ${PUBLICATION_NAME}  90

Check footnote on data block
    [Tags]  HappyPath
    user waits until page contains element  css:#releaseHeadlines-dataBlock-tables-tab
    user clicks element  css:#releaseHeadlines-dataBlock-tables-tab
    user scrolls to element  xpath://h3[.="Footnotes"]
    user checks page contains  ${FOOTNOTE_TEXT_3}
    user checks page does not contain  ${FOOTNOTE_TEXT_2}
    user checks page does not contain  ${FOOTNOTE_TEXT_1}

Navigate to table tool
    [Tags]  HappyPath
    user goes to url   %{PUBLIC_URL}/data-tables
    user waits for page to finish loading

Choose publication
    [Tags]  HappyPath
    user waits until page contains   Choose a publication
    user opens details section  Test theme
    user opens details section  ${TOPIC_NAME}
    user selects radio  ${PUBLICATION_NAME}
    user clicks button  Next step

Choose subject
    [Tags]  HappyPath
    user waits until page contains   ${SUBJECT_NAME}
    user selects radio  ${SUBJECT_NAME}
    user clicks button  Next step

Select locations
    [Tags]   HappyPath
    user waits until page contains heading 2  Choose locations
    user opens details dropdown   National
    user clicks checkbox   England
    user clicks element     css:#locationFiltersForm-submit

Select time period
    [Tags]   HappyPath
    user waits until page contains heading 2  Choose time period
    user selects start date    2020 Week 13
    user selects end date      2021 Week 24
    user clicks element     css:#timePeriodForm-submit

Select indicators
    [Tags]  HappyPath
    user waits until page contains heading 2  Choose your filters
    user clicks button  Select all 2 subgroup options

Select category filters
    [Tags]  HappyPath
    user opens category filters details section  Date
    user clicks category filters checkbox    01/04/2020
    user checks category filters checkbox is selected  01/04/2020
    user clicks category filters checkbox    01/04/2021
    user checks category filters checkbox is selected  01/04/2021

Create table
    [Tags]  HappyPath
    user clicks element   css:#filtersForm-submit
    user waits until results table appears     180

Check footnotes in table preview
    user checks page contains  ${FOOTNOTE_TEXT_3}
    user checks page does not contain  ${FOOTNOTE_TEXT_2}
    user checks page does not contain  ${FOOTNOTE_TEXT_1}