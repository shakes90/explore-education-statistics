*** Settings ***
Resource    ../../libs/admin-common.robot
Library  Collections

Force Tags  Admin  Local  Dev  AltersData

Suite Setup       user signs in as bau1
Suite Teardown    user closes the browser

*** Test Cases ***
Create Manage content test publication
    [Tags]  HappyPath
    environment variable should be set   RUN_IDENTIFIER
    user selects theme "Test theme" and topic "UI test topic %{RUN_IDENTIFIER}" from the admin dashboard
    user waits until page contains element    xpath://a[text()="Create new publication"]     60
    user clicks link  Create new publication
    user creates publication  Manage content test %{RUN_IDENTIFIER}   Test methodology    Sean Gibson

Verify Manage content test publication is created
    [Tags]  HappyPath
    user checks page contains accordion  Manage content test %{RUN_IDENTIFIER}
    user opens accordion section  Manage content test %{RUN_IDENTIFIER}
    user checks accordion section contains text  Manage content test %{RUN_IDENTIFIER}    Methodology
    user checks accordion section contains text  Manage content test %{RUN_IDENTIFIER}    Releases

Create release
    [Tags]  HappyPath
    user clicks element  css:[data-testid="Create new release link for Manage content test %{RUN_IDENTIFIER}"]
    user creates a new release for publication "Manage content test %{RUN_IDENTIFIER}" for start year "2025"
    user checks summary list item "Publication title" should be "Manage content test %{RUN_IDENTIFIER}"

Add summary content to release
    [Tags]  HappyPath
    user waits until page contains element   xpath://a[text()="Manage content"]
    user clicks element  xpath://a[text()="Manage content"]
    user waits until page contains heading  Manage content test %{RUN_IDENTIFIER}
    user clicks element  xpath://button[text()="Add summary content"]
    user waits until page contains element  xpath://p[text()="This section is empty"]
    user clicks element   xpath://span[text()="Edit"]
    user presses keys  Test intro text for Manage content test %{RUN_IDENTIFIER}
    user clicks element   xpath://button[text()="Save"]
    user waits until page contains element  xpath://p[text()="Test intro text for Manage content test %{RUN_IDENTIFIER}"]

# TODO: Add comment to summary content

Add release note to release
    [Tags]  HappyPath
    user clicks element   xpath://button[text()="Add note"]
    user clicks element   css:textarea#reason
    user presses keys  Test release note one
    user clicks element   xpath://button[text()="Add note"]
    # TODO: Check release note is there
    user checks page contains element   xpath://span[text()="See all 1 updates"]
    user clicks element   xpath://span[text()="See all 1 updates"]
    ${date}=  get datetime   %d %B %Y
    user checks page contains element   xpath://*[@data-testid="last-updated-element"]/time[text()="${date}"]
    user checks page contains element   xpath://*[@data-testid="last-updated-element"]/p[text()="Test release note one"]

Add related guidance link to release
    [Tags]  HappyPath
    user clicks element  xpath://button[text()="Add related information"]
    user clicks element  css:input#title
    user presses keys   Test link one
    user clicks element  css:input#link-url
    user presses keys   http://test1.example.com/test1
    user clicks element  xpath://button[text()="Create link"]

# TODO: Add Secondary Stats
# TODO: Add key statistics

Add key statistics summary content to release
    [Tags]  HappyPath
    user clicks element   xpath://button[text()="Add key statistics summary content"]
    user waits until page contains element  xpath://p[text()="This section is empty"]
    user clicks element   xpath://section[@id="headlines"]//span[text()="Edit"]
    user presses keys   Test key statistics summary text for Manage content test %{RUN_IDENTIFIER}
    user clicks element  xpath://button[text()="Save"]

Add accordion sections to release
    [Tags]  HappyPath
    user clicks element   xpath://button[text()="Add new section"]
    user waits until page contains element  xpath://span[text()="New section"]
    user changes accordion section title  1   Test section one

    user clicks element   xpath://button[text()="Add new section"]
    user waits until page contains element  xpath://span[text()="New section"]
    user changes accordion section title  2   Test section two

    user clicks element   xpath://button[text()="Add new section"]
    user waits until page contains element  xpath://span[text()="New section"]
    user changes accordion section title  3   Test section three

    # TODO: Validate that three accordion sections exist

Add three content blocks to Test section one
    [Tags]  HappyPath
    ${section_one}=  user gets editable accordion section element  Test section one
    user opens editable accordion section   ${section_one}
    user clicks add content for editable accordion section   ${section_one}
    user clicks add content for editable accordion section   ${section_one}
    user clicks add content for editable accordion section   ${section_one}
    set global variable   ${section_one}   ${section_one}

Add text to newly created content blocks
    [Tags]  HappyPath
    user adds content to accordion section content block  ${section_one}   1    block one test text
    user adds content to accordion section content block  ${section_one}   2    block two test text
    user adds content to accordion section content block  ${section_one}   3    block three test text

    user checks accordion section contains X blocks   ${section_one}    3

Delete second content block
    [Tags]  HappyPath
    user deletes editable accordion section content block  ${section_one}   2
    user waits until page does not contain    block two test text
    user checks accordion section contains X blocks   ${section_one}    2

Validate two remaining content blocks
    [Tags]  HappyPath
    user checks accordion section content block contains text   ${section_one}   1   block one test text
    user checks accordion section content block contains text   ${section_one}   2   block three test text

