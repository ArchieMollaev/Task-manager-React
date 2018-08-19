import * as constants from 'const';

const {
  CREATE_CARD,
  CARD_CREATED,
} = constants;

export const createCard = data => ({
  type: CREATE_CARD, data,
});

export const createCardResponse = response => ({
  type: CARD_CREATED, response,
});
