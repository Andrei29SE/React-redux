import { v4 as uuidv4 } from 'uuid'

function createBookWithId(book) {
  return {
    ...book,
    isFavourite: false,
    id: uuidv4(),
  }
}

export default createBookWithId
