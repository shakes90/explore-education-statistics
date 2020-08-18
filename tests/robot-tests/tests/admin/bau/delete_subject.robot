*** Settings ***
Resource    ../../libs/admin-common.robot

Force Tags  Admin  Local  Dev  AltersData

Suite Setup       user signs in as bau1
Suite Teardown    user closes the browser

*** Variables ***
${TOPIC_NAME}        %{TEST_TOPIC_NAME}
${PUBLICATION_NAME}  UI tests - delete subject %{RUN_IDENTIFIER}

*** Test Cases ***
Go to Create publication page for "UI tests topic" topic
    [Tags]  HappyPath
    user selects theme "Test theme" and topic "${TOPIC_NAME}" from the admin dashboard
    user waits until page contains link    Create new publication
    user checks page does not contain button   ${PUBLICATION_NAME}
    user clicks link  Create new publication
    user waits until page contains heading 1  Create new publication
    user creates publication    ${PUBLICATION_NAME}

Verify that new publication has been created
    [Tags]  HappyPath
    user selects theme "Test theme" and topic "${TOPIC_NAME}" from the admin dashboard
    user waits until page contains button   ${PUBLICATION_NAME}
    user checks page contains accordion   ${PUBLICATION_NAME}
    user opens accordion section  ${PUBLICATION_NAME}
    user checks testid element contains  Methodology for ${PUBLICATION_NAME}  No methodology assigned
    user checks testid element contains  Releases for ${PUBLICATION_NAME}  No releases created

Create new release
    [Tags]   HappyPath
    user clicks element  css:[data-testid="Create new release link for ${PUBLICATION_NAME}"]
    user waits until page contains heading 1  Create new release

User fills in form
    [Tags]  HappyPath
    user waits until page contains element  id:releaseSummaryForm-timePeriodCoverage
    user selects from list by label  id:releaseSummaryForm-timePeriodCoverage  Tax Year
    user enters text into element  id:releaseSummaryForm-timePeriodCoverageStartYear  2020

    user clicks radio  Ad Hoc

Click Create new release button
    [Tags]   HappyPath
    user clicks button   Create new release
    user waits until page contains title caption  Edit release
    user waits until page contains heading 1  ${PUBLICATION_NAME}

Verify Release summary
    [Tags]  HappyPath
    user checks page contains element   xpath://li/a[text()="Release summary" and contains(@aria-current, 'page')]
    user waits until page contains heading 2    Release summary
    user checks summary list contains  Publication title  ${PUBLICATION_NAME}
    user checks summary list contains  Time period  Tax Year
    user checks summary list contains  Release period  2020-21
    user checks summary list contains  Lead statistician  Tingting Shu
    user checks summary list contains  Scheduled release  Not scheduled
    user checks summary list contains  Next release expected  Not set
    user checks summary list contains  Release type  Ad Hoc

Upload subject
    [Tags]  HappyPath
    user clicks element  xpath://li/a[text()="Manage data"]

    user enters text into element  id:dataFileUploadForm-subjectTitle   UI test subject
    choose file   id:dataFileUploadForm-dataFile       ${CURDIR}${/}files${/}upload-file-test-with-filter.csv
    choose file   id:dataFileUploadForm-metadataFile   ${CURDIR}${/}files${/}upload-file-test-with-filter.meta.csv
    user clicks button  Upload data files

    user waits until page contains element   xpath://h2[text()="Uploaded data files"]
    user waits until page contains accordion section   UI test subject
    user opens accordion section   UI test subject
    user checks page contains element   xpath://dt[text()="Subject title"]/../dd/h4[text()="UI test subject"]
    user waits until page contains element  xpath://dt[text()="Status"]/../dd//strong[text()="Complete"]     180

Create subject footnote for new subject
    [Tags]  HappyPath
    user clicks element  id:footnotes-tab
    user waits until page contains heading 2  Footnotes
    user waits until page contains element   id:add-footnote-button

    user clicks element   id:add-footnote-button
    user waits until page contains element   xpath://fieldset[@datatest-id="footnote-subject UI test subject"]
    user clicks element  xpath://fieldset[@datatest-id="footnote-subject UI test subject"]//label[text()="Select all indicators and filters for this subject"]/../input

    user clicks element   id:create-footnote-form-content
    user presses keys  UI tests subject footnote

    user clicks button   Create footnote

Create indicator footnote for new subject
    [Tags]  HappyPath
    user waits until page contains element   id:add-footnote-button

    user clicks element   id:add-footnote-button
    user waits until page contains element   xpath://fieldset[@datatest-id="footnote-subject UI test subject"]
    user opens details dropdown  Indicators
    user clicks checkbox  Admission Numbers

    user clicks element   id:create-footnote-form-content
    user presses keys  UI tests indicator Admission Numbers footnote

    user clicks button   Create footnote

Create Random Filter Total footnote for new subject
    [Tags]  HappyPath
    user waits until page contains element   id:add-footnote-button

    user clicks element   id:add-footnote-button
    user waits until page contains element   xpath://fieldset[@datatest-id="footnote-subject UI test subject"]

    user opens details dropdown   Random Filter
    user clicks checkbox   Total

    user clicks element   id:create-footnote-form-content
    user presses keys  UI tests Random Filter Total footnote

    user clicks button   Create footnote

Create Random Filter Select all footnote for new subject
    [Tags]  HappyPath
    user waits until page contains element   id:add-footnote-button

    user clicks element   id:add-footnote-button
    user waits until page contains element   xpath://fieldset[@datatest-id="footnote-subject UI test subject"]

    user opens details dropdown   Random Filter
    user clicks checkbox   Select all

    user clicks element   id:create-footnote-form-content
    user presses keys  UI tests Random Filter Select all footnote

    user clicks button   Create footnote

Delete UI test subject
    [Tags]  HappyPath
    user clicks element  id:data-upload-tab
    user waits until page contains element  xpath://legend[text()="Add new data to release"]

    user waits until page contains accordion section  UI test subject
    user clicks button   Delete files

    user waits until page contains heading 1   Confirm deletion of selected data files
    user waits until page contains    4 footnotes will be removed or updated.

    user clicks button  Confirm
    user waits until page does not contain accordion section   UI test subject
