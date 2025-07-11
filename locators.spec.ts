import test, { expect } from "@playwright/test"

//Assignment: 1 Create Lead

test("Create Lead", async ({ page }) => {

  await page.goto("https://login.salesforce.com/")

  await page.locator("//input[@id='username']").fill('dilip@testleaf.com')

  await page.fill("//input[@id='password']", 'Leaf@123')

  await page.click("//input[@id='Login']")

  await page.getByRole("button", { name: "App Launcher" }).click()

  await page.getByRole("button", { name: "View All" }).click()

  await page.waitForTimeout(10000)

  await page.click("//p[text()='Sales']")

  await page.click("(//span[text()='Leads'])[1]")

  await page.getByRole("button", { name: "New" }).click()

  await page.locator("//button[@aria-label='Salutation']").click()

  await page.locator("//lightning-base-combobox-item[@data-value='Mr.']").click()

  await page.locator("//input[@name='lastName']").fill("Deepak")

  await page.locator("(//input[@part='input'])[9]").fill("AVEVA")

  await page.locator("//button[@name='SaveEdit']").click()

  await page.waitForSelector("//h1//lightning-formatted-name[@slot='primaryField']", { timeout: 60000 })

  const leadTitle = await page.locator("//h1//lightning-formatted-name[@slot='primaryField']").textContent()

  console.log("Lead Title from Page:" + leadTitle)

  const expectedTitle = "Mr.  Deepak"

  expect(leadTitle).toEqual(expectedTitle)

  console.log("Lead verified")

})

//Assignment: 2 Edit Lead

test('Edit Lead in leaftaps', async ({ page }) => {

  await page.goto('http://leaftaps.com/opentaps/control/main')

  await page.getByLabel('Username').fill('Demosalesmanager')

  await page.getByLabel('Password').fill('crmsfa')

  await page.getByRole('button', { name: 'Login' }).click()

  await page.locator("//a[contains(text(),'CRM/SFA')]").click()

  await page.getByRole('link', { name: 'Leads' }).click()

  await page.locator("a[href*='createLeadForm']").click()

  await page.locator("//input[@id='createLeadForm_companyName']").fill('AVEVA')

  await page.waitForTimeout(1000)

  await page.locator("//input[@id='createLeadForm_firstName']").fill('Deepak')

  await page.waitForTimeout(1000)

  await page.locator("//input[@id='createLeadForm_lastName']").fill('Pooranachandran')

  await page.waitForTimeout(1000)

  await page.locator("//input[@value='Create Lead']").click()

  await page.waitForTimeout(1000)

  await page.locator("//a[text()='Edit']").click()

  await page.locator("//input[@id='updateLeadForm_companyName']").fill('STDD Tech')

  await page.getByRole('button', { name: 'Update' }).click()

  const updatedCompany = await page.locator("//span[@id='viewLead_companyName_sp']").textContent()

  expect(updatedCompany).toContain('STDD Tech')

  console.log("Lead Edited")

})

//Assignment: 3 Create Individuals

test('Create Individual in Salesforce', async ({ page }) => {

  await page.goto('https://login.salesforce.com')

  await page.locator('#username').fill('dilip@testleaf.com')

  await page.locator('#password').fill('Leaf@123')

  await page.locator('#Login').click()

  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: 'App Launcher' }).click()

  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: 'View All' }).click()

  await page.waitForTimeout(10000)

  await page.getByText('Individuals', { exact: true }).click()

  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: 'New' }).click()

  await page.waitForTimeout(1000)

  await page.getByLabel('Last Name').fill('Deepak')

  await page.locator("(//span[@class=' label bBody'])[3]").click()

  await page.waitForTimeout(2000)

  const updatedPageTitle = await page.locator("//span[@class='uiOutputText' and text()='Deepak']").textContent()

  const expectedPageTitle = "Deepak"

  expect(updatedPageTitle).toEqual(expectedPageTitle)

  console.log('Individual Created')

})

//Assignment: 4 Edit Individuals

test('Edit Individual in Salesforce Deepak', async ({ page }) => {

  await page.goto('https://login.salesforce.com')

  await page.locator('#username').fill('dilip@testleaf.com')

  await page.locator('#password').fill('Leaf@123')

  await page.locator('#Login').click()

  await page.waitForTimeout(2000)

  await page.getByRole('button', { name: 'App Launcher' }).click()

  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: 'View All' }).click()

  await page.waitForTimeout(1000)

  await page.getByText('Individuals', { exact: true }).click()

  await page.waitForSelector("//table", { timeout: 10000 })

  await page.getByText('Deepak', { exact: true }).click()

  await page.waitForTimeout(2000)

  await page.locator("(//div[@title='Edit'])[1]").click()

  await page.waitForTimeout(1000)

  await page.locator("//a[@data-interactive-lib-uid='4']").click()

  await page.click('text=Mr.')

  const lastNameInput = page.locator("//input[@placeholder='Last Name']")

  await lastNameInput.waitFor({ state: 'visible', timeout: 5000 })

  await lastNameInput.click()

  await lastNameInput.fill('Pooranachandran')

  await page.waitForTimeout(1000)

  await page.locator("(//span[@class=' label bBody'])[3]").click()

  await page.waitForTimeout(1000)

  const updatedPageTitle = await page.locator("//span[@class='uiOutputText' and contains(text(), 'Pooranachandran')]").textContent()

  const expectedPageTitle = "Mr.  Pooranachandran"

  expect(updatedPageTitle).toEqual(expectedPageTitle)

  console.log('Individual Edited Successfully')

})



