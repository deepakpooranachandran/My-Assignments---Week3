import { test, expect } from '@playwright/test'
import { text } from 'stream/consumers'

//Assignment: 1 Create a Lead

test('Create Lead in LeafTaps', async ({ page }) => {

  await page.goto('http://leaftaps.com/opentaps/control/main')

  await page.locator("input[name='USERNAME']").fill('demosalesmanager')

  await page.locator("input[name='PASSWORD']").fill('crmsfa')

  await page.locator(".decorativeSubmit").click()

  await page.waitForSelector("a:has-text('CRM/SFA')")

  await page.getByRole('link', { name: 'CRM/SFA' }).click()

  await page.waitForSelector("a:has-text('Leads')")

  await page.locator("//a[text()='Leads']").click()

  await page.waitForTimeout(1000)

  await page.getByRole('link', { name: 'Create Lead' }).click()

  await page.waitForSelector('#createLeadForm_companyName')

  await page.locator('#createLeadForm_companyName').fill('STDD Tech')

  await page.locator('#createLeadForm_firstName').fill('Deepak')

  await page.locator('#createLeadForm_lastName').fill('Pooranachandran')

  await page.locator('select#createLeadForm_dataSourceId').selectOption({ label: 'Employee' })

  await page.locator('#createLeadForm_generalProfTitle').fill('QA Engineer')

  await page.locator('#createLeadForm_annualRevenue').fill('1000000')

  await page.locator('#createLeadForm_departmentName').fill('Testing')

  await page.locator('#createLeadForm_primaryPhoneNumber').fill('9876543210')

  await page.locator('input[name="submitButton"]').click()

  await page.waitForSelector("span#viewLead_companyName_sp")

  const company = await page.locator('#viewLead_companyName_sp').textContent()
  console.log('Company:', company)

  const firstName = await page.locator('#viewLead_firstName_sp').textContent()
  console.log('First Name:', firstName)

  const lastName = await page.locator('#viewLead_lastName_sp').textContent()
  console.log('Last Name:', lastName)

  const status = await page.locator("//span[@id='viewLead_statusId_sp']").textContent()
  console.log('Status:', status)

  expect(company).toContain('STDD Tech')
  expect(firstName).toContain('Deepak')
  expect(lastName).toContain('Pooranachandran')
  expect(status).toContain('Assigned')
  const title = await page.title()
  
  console.log("Page Title is: " + title)

  console.log('All assertions passed successfully')
})

//Assignment: 2 Edit a Lead

test('Edit Lead in LeafTaps', async ({ page }) => {

  await page.goto('http://leaftaps.com/opentaps/control/main')

  await page.locator('#username').fill('Demosalesmanager')

  await page.locator('#password').fill('crmsfa')

  await page.locator('.decorativeSubmit').click()

  await page.locator('text=CRM/SFA').click()

  await page.locator('a:has-text("Leads")').click()

  await page.locator('a:has-text("Find Leads")').click()

  await page.locator("//input[@id='ext-gen248']").fill('Deepak')

  await page.locator("//button[@id='ext-gen334']").click()

  await page.waitForTimeout(2000)

  await page.locator('//div[@class="x-grid3-cell-inner x-grid3-col-partyId"]/a').first().click()

  await page.locator('a:has-text("Edit")').click()

  await page.locator('#updateLeadForm_companyName').fill('STDD Tech Pvt Ltd')

  await page.locator('#updateLeadForm_annualRevenue').fill('2500000')

  await page.locator('#updateLeadForm_departmentName').fill('Design')

  await page.locator('#updateLeadForm_description').fill('This is an updated description')

  await page.locator('input[value="Update"]').click()

  const companyName = await page.locator('#viewLead_companyName_sp').textContent()
  const revenue = await page.locator('#viewLead_annualRevenue_sp').textContent()
  const dept = await page.locator('#viewLead_departmentName_sp').textContent()
  const desc = await page.locator('#viewLead_description_sp').textContent()

  expect(companyName).toContain('STDD Tech Pvt Ltd')
  expect(revenue).toContain('$2,500,000.00')
  expect(dept).toContain('Design')
  expect(desc).toContain('This is an updated description')
  const title = await page.title()
  
  console.log("Page Title is: " + title)
  console.log('All assertions passed successfully')

})

//Assignment: 3 Create a new Account

test.only('Create a new Account in Salesforce', async ({ page }) => {

  await page.goto('https://login.salesforce.com')
  
  await page.getByLabel('Username').fill('dilip@testleaf.com')
 
  await page.getByLabel('Password').fill('Leaf@123')
  
  await page.locator('#Login').click()
  await page.waitForTimeout(10000)

  expect(await page.title()).toContain('Home')
  expect(page.url()).toContain('lightning')
  console.log('Title and URL verified')
  await page.waitForTimeout(5000)

  await page.locator("//div[@class='slds-icon-waffle']").click()
  await page.waitForTimeout(3000)

  await page.getByText('View All').click()

  await page.getByPlaceholder('Search apps or items...').fill('Service')

  await page.locator('(//mark[text()="Service"])[1]').click()

  await page.waitForTimeout(1000)

  await page.getByTitle('Accounts').click()

  await page.locator("//a[@title='New']").click()

  await page.locator("//input[@name='Name']").fill("STDD")

  await page.locator("//button[@name='SaveEdit']").click()

  const toastMessage = await page.locator('div.toastContent').textContent()
  expect(toastMessage).toContain('was created')
  console.log('Toast message verified ' + toastMessage)

})