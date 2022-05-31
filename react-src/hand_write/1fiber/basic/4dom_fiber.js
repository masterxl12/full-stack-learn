let A1 = { type: 'div', key: 'A1' }
let B1 = { type: 'div', key: 'B1', return: A1 }
let B2 = { type: 'div', key: 'B2', return: A1 }
let C1 = { type: 'div', key: 'C1', return: B1 }
let C2 = { type: 'div', key: 'C2', return: B1 }
A1.child = B1
B1.child = C1
B1.sibling = B2
C1.sibling = C2

function workLoop(fiber) {
  let nextUnitOfWork = performUnitWork(fiber)
  if (!nextUnitOfWork) {
    console.log('render阶段结束...')
  } else {
    workLoop(nextUnitOfWork)
  }
}

function performUnitWork(fiber) {
  beginUnitWork(fiber)
  if (fiber.child) {
    return fiber.child
  }

  while (fiber) {
    completeUnitWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling
    }
    fiber = fiber.return
  }
}

function completeUnitWork(fiber) {
  console.log('结束:', fiber.key)
}

function beginUnitWork(fiber) {
  console.log('开始:', fiber.key)
}

workLoop(A1)
