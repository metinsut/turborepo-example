import { Asset } from 'store/slices/asset/detail/types';
import { ValidatorRules } from './types';
import { createValidator, dateValidator, emptyCheckValidator, rangeValidator } from './base';
import { maxDigitValidator } from './base/MaxDigitValidator';

const rules: ValidatorRules<Asset> = {
  brandId: emptyCheckValidator('brandId', { fieldName: 'assets.asset_edit.brand_field_hint' }),
  contactPerson: rangeValidator('contactPerson', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.contact_person_field_hint',
    maxLength: 128,
    minLength: 2
  }),
  fCode: rangeValidator('fCode', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.fcode_field_hint',
    maxLength: 128,
    minLength: 3
  }),
  modelId: emptyCheckValidator('modelId', { fieldName: 'assets.asset_edit.model_field_hint' }),
  notes: rangeValidator('notes', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.notes_field_hint',
    maxLength: 512,
    minLength: 3
  }),
  productionDate: dateValidator('productionDate', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.production_date_field_hint'
  }),
  purchasedCost: maxDigitValidator('purchasedCost', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.cost_field_hint'
  }),
  purchasedDate: dateValidator('purchasedDate', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.purchased_date_field_hint'
  }),
  purchasedFirm: rangeValidator('purchasedFirm', {
    allowEmpty: true,
    fieldName: 'assets.asset_edit.purchased_firm_field_hint',
    maxLength: 128,
    minLength: 3
  })
};

const assetValidator = createValidator(rules);

export default assetValidator;
