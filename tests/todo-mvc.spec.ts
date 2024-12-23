import {expect, test} from '@playwright/test'
import { TodoPage } from './pages/todo-page'

let todoPage: TodoPage

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)
    await todoPage.openToDoPage()
})

test('has title', async ({ page }) => {
    await expect(todoPage.pageLogo).toBeVisible()
})

test('create a new ToDo task', async ({ page }) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    expect(await todoPage.countToDoItems()).toBe(1)
})

test('delete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.deleteToDoTaskByName('newTask')
    expect(await todoPage.countToDoItems()).toBe(0)
})

test('complete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.completeTodoTaskByName('newTask')
    await todoPage.checkCompleteTodoTaskByName('newTask')
})

test('buttons All, Active, Completed, Clean are visible ', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await expect.soft(todoPage.filterAll).toBeVisible()
    await expect.soft(todoPage.filterActive).toBeVisible()
    await expect.soft(todoPage.filterCompleted).toBeVisible()
    await expect.soft(todoPage.buttonClearCompletedTasks).toBeVisible()
})

