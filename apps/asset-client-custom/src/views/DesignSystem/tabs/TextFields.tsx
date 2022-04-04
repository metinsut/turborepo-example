import { AssetFormField } from 'store/slices/asset/detail/types';
import {
  Box,
  CatChip,
  CatMenuItem,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatSelect,
  CatTextField
} from 'catamaran/core';
import { Brand } from 'store/slices/brands/types';
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { ConfirmButton, EditButton } from 'catamaran/core/Button';
import { SectionMode } from 'utils';
import { ValidatorRules } from 'helpers/validations/types';
import { createValidator, rangeValidator } from 'helpers/validations/base';
import { selectAllBranches } from 'store/slices/branches';
import { selectAssetImportBranchId } from 'store/slices/imports/asset/selectors';
import { setImportBranchId } from 'store/slices/imports/asset/slice';
import { useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import ChipTextField from 'catamaran/core/ChipTextField/ChipTextField';
import DynamicField from 'views/Assets/AssetDetail/InformationCard/DynamicItems/DynamicField';
import EditIcon from 'catamaran/icons/Edit';
import NotFoundIcon from 'catamaran/icons/NotFound';
import PrimaryIcon from 'catamaran/icons/Primary';
import SearchDropdownHelper from 'components/CatamaranTextField/SearchDropdownHelper';
import SearchIcon from 'catamaran/icons/Search';
import Searchable from 'components/CatamaranTextField/Searchable';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2)
  },
  searchDropdownText: {
    padding: theme.spacing(1)
  },
  searchable: {
    width: '40%'
  },
  textField: {
    width: '60%'
  }
}));

type Props = {
  className?: string;
};

const rules: ValidatorRules<Brand> = {
  name: rangeValidator('name', { fieldName: 'brands.name_field', maxLength: 64, minLength: 5 })
};

const brandTestValidator = createValidator(rules);

const brands: Brand[] = [
  {
    id: 'ac7cb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Beypazarı'
  },
  {
    id: '874cb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Kızılay'
  },
  {
    id: '441cb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Uludağ'
  },
  {
    id: '001cb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Sarıkız'
  },
  {
    id: '8596b961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Özkaynak'
  },
  {
    id: 'bbbcb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Damla'
  },
  {
    id: '8596b961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Kula'
  },
  {
    id: 'bbbcb961-ffe0-4112-81de-01c947c4ad4f',
    name: 'Kınık'
  }
];

function TextFields(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useTypedDispatch();
  const branches = useTypedSelector(selectAllBranches);
  const branchId = useTypedSelector(selectAssetImportBranchId);

  const formHelperNoSearchConfirmable = useFormState({ name: 'Test Value' }, brandTestValidator);
  const formHelperNoSearchEditOnly = useFormState({ name: '' }, brandTestValidator);
  const formHelperSearchConfirmable = useFormState({ name: '' }, brandTestValidator);
  const formHelperSearchEditOnly = useFormState({ name: '' }, brandTestValidator);
  const [emails, setEmails] = useState<string[]>([]);

  const [, setSelectedTodo] = useState(formHelperSearchEditOnly.formState.values);

  const handleConfirm = async (brand: Brand) => {
    setSelectedTodo(brand);
    return brand;
  };

  const handleAddNew = async (brand: Brand) => {
    const finalItem: Brand = { ...brand, id: uuid() };
    brands.push(finalItem);
    await handleConfirm(brand);

    return brand;
  };

  const formHelperFilled = useFormState({ name: 'iser yeah' }, brandTestValidator);
  const formHelperFilledNotValid = useFormState({ name: 'iser' }, brandTestValidator);
  const formHelperEmpty = useFormState({ name: '' }, brandTestValidator);

  const clear = () => {
    formHelperEmpty.setFormState((prev) => ({ ...prev, name: '' }));
  };

  const handleBranchChange = (event: any) => {
    dispatch(setImportBranchId(event.target.value));
  };

  const initialFormFields: AssetFormField[] = [
    {
      dataType: 'dateTime',
      formFieldId: '1',
      isRequired: false,
      section: 'deviceInfo',
      title: 'Expiry Date',
      value: '2021-09-07T10:48:39.015738+03:00'
    },
    {
      dataType: 'freeText',
      formFieldId: '2',
      isRequired: false,
      isUnique: true,
      section: 'identification',
      title: 'Serial No - free text - required - unique',
      value: 'KM1002'
    },
    {
      dataType: 'freeText',
      formFieldId: '3',
      isRequired: false,
      section: 'deviceInfo',
      title: 'Manifacturer - free text - not required',
      value: 'Nintendo'
    },
    {
      dataType: 'freeText',
      formFieldId: '4',
      isRequired: true,
      section: 'deviceInfo',
      title: 'Factory - free text -required',
      value: 'Shanghai'
    },
    {
      dataType: 'numerical',
      formFieldId: '5',
      isRequired: true,
      section: 'deviceInfo',
      title: 'Number of Cakes - numerical - required',
      value: undefined
    },
    {
      dataType: 'email',
      formFieldId: '6',
      isRequired: true,
      section: 'deviceInfo',
      title: 'Contact Mail - email - required',
      value: undefined
    },
    {
      dataType: 'email',
      formFieldId: '61',
      isRequired: false,
      section: 'deviceInfo',
      title: 'Hobby Mail - email - not required',
      value: undefined
    },
    {
      dataType: 'phone',
      formFieldId: '7',
      isRequired: true,
      section: 'deviceInfo',
      title: 'Contact Phone - phone - required',
      value: undefined
    }
  ];

  const [assetFormFields, setAssetFormFields] = useState(initialFormFields);
  const [mode, setMode] = useState<SectionMode>('readonly');

  const handleDynamicValueChange = (id: string, value: string) => {
    const newArray = [...assetFormFields];
    const index = newArray.findIndex((i) => i.formFieldId === id);
    newArray[index].value = value;
    setAssetFormFields(newArray);
  };

  return (
    <>
      <Paper className={clsx(classes.root, className)}>
        <Grid container justifyContent="space-between" style={{ marginTop: '15px' }}>
          <CatamaranTextField
            adornments={[
              {
                child: <PrimaryIcon color="green" contained fontSize="small" key={1} />,
                hover: 'always',
                position: 'end',
                show: 'always'
              }
            ]}
            className={classes.textField}
            deletable={false}
            formHelper={formHelperNoSearchEditOnly}
            isRequired
            label="No Search - Edit Only - Required"
            mode="editOnly"
            name="name"
            validatable
          />
          <Searchable
            className={classes.searchable}
            fixedRowBottom={
              <Button disableElevation fullWidth>
                Enable blank values
              </Button>
            }
            fixedRowTop={
              <Button disableElevation fullWidth>
                Select all items
              </Button>
            }
            formHelper={formHelperSearchEditOnly}
            mode="editOnly"
            name="name"
            noItemElement={
              <Typography className={classes.searchDropdownText} variant="body1">
                {t('brands.no_brand_found')}
              </Typography>
            }
            onAddNew={handleAddNew}
            onConfirm={handleConfirm}
            primaryKey="id"
            renderInput={(props) => (
              <CatamaranTextField isRequired label="Seachable - Edit Only" validatable {...props} />
            )}
            searchHelperText={
              <SearchDropdownHelper messageKey="assets.asset_edit.brand_dropdown_hint" />
            }
            searchOptions={brands}
            showSearchHelperText
          />
        </Grid>
        <Grid container justifyContent="space-between" style={{ marginTop: '15px' }}>
          <CatamaranTextField
            className={classes.textField}
            deletable={false}
            formHelper={formHelperNoSearchConfirmable}
            label="No Search - Confirmable"
            name="name"
            validatable
          />
          <Searchable
            className={classes.searchable}
            formHelper={formHelperSearchConfirmable}
            mode="editAndConfirm"
            name="name"
            noItemElement={
              <Typography className={classes.searchDropdownText} variant="body1">
                {t('brands.no_brand_found')}
              </Typography>
            }
            onAddNew={handleAddNew}
            onConfirm={handleConfirm}
            primaryKey="id"
            renderInput={(props) => (
              <CatamaranTextField label="Seachable - Confirmable" validatable {...props} />
            )}
            searchHelperText={
              <SearchDropdownHelper messageKey="assets.asset_edit.brand_dropdown_hint" />
            }
            searchOptions={brands}
            showSearchHelperText
          />
        </Grid>
        <Box flex mt={2}>
          <ChipTextField emails={emails} onChange={(emails) => setEmails(emails)} />
        </Box>
      </Paper>
      <CatPanel>
        <CatPanelHeader title="CatTextFields" />
        <CatPanelContent>
          <div className="grid gap-8 mb">
            <CatTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CatChip
                      clickable
                      icon={<NotFoundIcon fontSize="small" opacity={0.8} />}
                      label="Not Found"
                      onClick={clear}
                      onDelete={clear}
                      onMouseDown={(e) => {
                        // add this if you want to not lose focus when click
                        e.preventDefault();
                      }}
                      size="medium"
                      variant="outlined"
                    />
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      contained={false}
                      fontSize="medium"
                      hoverable={false}
                      key={1}
                      opacity={0.8}
                    />
                  </InputAdornment>
                )
              }}
              label="Asset"
              name="name"
              onChange={formHelperEmpty.handleChange}
              placeholder="Start typing to search for an Asset (Serial No. or F-Code)"
              sx={{ marginBottom: '16px', width: '50%' }}
              value={formHelperEmpty.formState.values.name}
            />
            <div className="grid gap-8 grid-auto-flow-column">
              <CatTextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CatChip
                        icon={<EditIcon fontSize="small" />}
                        label="Not Found"
                        onDelete={() => {}}
                        size="medium"
                        variant="outlined"
                      />
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        contained={false}
                        fontSize="medium"
                        hoverable={false}
                        key={1}
                        opacity={0.8}
                      />
                    </InputAdornment>
                  )
                }}
                label="required: true - validatable: false"
                name="name"
                onChange={formHelperEmpty.handleChange}
                placeholder="hello world"
                required
                touched={formHelperEmpty.formState.touchedFields.name}
                valid={!formHelperEmpty.formState.errors.name}
                value={formHelperEmpty.formState.values.name}
              />
              <CatTextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        color="darkGrey"
                        contained={false}
                        fontSize="medium"
                        hoverable={false}
                        key={1}
                        opacity={0.8}
                      />
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        contained={false}
                        fontSize="medium"
                        hoverable={false}
                        key={1}
                        opacity={0.8}
                      />
                    </InputAdornment>
                  )
                }}
                name="name"
                onChange={formHelperEmpty.handleChange}
                placeholder="hello world"
                touched={formHelperEmpty.formState.touchedFields.name}
                valid={!formHelperEmpty.formState.errors.name}
                validatable
                value={formHelperEmpty.formState.values.name}
              />
              <CatTextField
                label="required: true - validatable: true"
                name="name"
                onChange={formHelperEmpty.handleChange}
                required
                rows={4}
                touched={formHelperEmpty.formState.touchedFields.name}
                valid={!formHelperEmpty.formState.errors.name}
                validatable
                value={formHelperEmpty.formState.values.name}
              />
            </div>
            <div className="grid gap-8 grid-auto-flow-column">
              <CatTextField
                label="required: true - validatable: false"
                name="name"
                onChange={formHelperFilled.handleChange}
                required
                touched={formHelperFilled.formState.touchedFields.name}
                valid={!formHelperFilled.formState.errors.name}
                value={formHelperFilled.formState.values.name}
              />
              <CatTextField
                label="required: false - validatable: true"
                name="name"
                onChange={formHelperFilled.handleChange}
                touched={formHelperFilled.formState.touchedFields.name}
                valid={!formHelperFilled.formState.errors.name}
                validatable
                value={formHelperFilled.formState.values.name}
              />
              <CatTextField
                label="required: true - validatable: true"
                name="name"
                onChange={formHelperFilled.handleChange}
                required
                touched={formHelperFilled.formState.touchedFields.name}
                valid={!formHelperFilled.formState.errors.name}
                validatable
                value={formHelperFilled.formState.values.name}
              />
            </div>
            <div className="grid gap-8 grid-auto-flow-column">
              <CatTextField
                label="required: true - validatable: false"
                name="name"
                onChange={formHelperFilledNotValid.handleChange}
                required
                touched={formHelperFilledNotValid.formState.touchedFields.name}
                valid={!formHelperFilledNotValid.formState.errors.name}
                value={formHelperFilledNotValid.formState.values.name}
              />
              <CatTextField
                label="required: false - validatable: true"
                name="name"
                onChange={formHelperFilledNotValid.handleChange}
                touched={formHelperFilledNotValid.formState.touchedFields.name}
                valid={!formHelperFilledNotValid.formState.errors.name}
                validatable
                value={formHelperFilledNotValid.formState.values.name}
              />
              <CatTextField
                label="required: true - validatable: true"
                name="name"
                onChange={formHelperFilledNotValid.handleChange}
                required
                touched={formHelperFilledNotValid.formState.touchedFields.name}
                valid={!formHelperFilledNotValid.formState.errors.name}
                validatable
                value={formHelperFilledNotValid.formState.values.name}
              />
            </div>
            <div className="grid gap-8 grid-auto-flow-column">
              <CatSelect
                fullWidth
                label="iser"
                onChange={handleBranchChange}
                required
                value={branchId ?? ''}
              >
                {branches.map((b) => (
                  <CatMenuItem key={b.id} value={b.id}>
                    {b.name}
                  </CatMenuItem>
                ))}
              </CatSelect>
              <CatSelect
                densed
                displayEmpty
                fullWidth
                onChange={handleBranchChange}
                value={branchId ?? ''}
              >
                <CatMenuItem disabled key="" value="">
                  {t('common.dropdown_generic_hint')}
                </CatMenuItem>
                {branches.map((b) => (
                  <CatMenuItem key={b.id} value={b.id}>
                    {b.name}
                  </CatMenuItem>
                ))}
              </CatSelect>
              <CatSelect
                densed
                displayEmpty
                fullWidth
                onChange={handleBranchChange}
                value={branchId ?? ''}
              >
                <CatMenuItem disabled key="" value="">
                  {t('common.dropdown_generic_hint')}
                </CatMenuItem>
                {branches.map((b) => (
                  <CatMenuItem key={b.id} value={b.id}>
                    {b.name}
                  </CatMenuItem>
                ))}
              </CatSelect>
            </div>
          </div>
        </CatPanelContent>
      </CatPanel>
      <CatPanel className="mt16">
        <CatPanelHeader title="Dynamic input fields" />
        <CatPanelContent>
          <div className="grid gap-8 mb8" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            {assetFormFields.map((formField) => (
              <DynamicField
                assetFormField={formField}
                key={formField.formFieldId}
                mode={mode}
                onEditClick={() => setMode('edit')}
                onValueChange={handleDynamicValueChange}
                touched={
                  initialFormFields.find((i) => i.formFieldId === formField.formFieldId).value !==
                  formField.value
                }
              />
            ))}
            {mode === 'edit' ? (
              <ConfirmButton onClick={() => setMode('readonly')} />
            ) : (
              <EditButton onClick={() => setMode('edit')} />
            )}
          </div>
        </CatPanelContent>
      </CatPanel>
    </>
  );
}

export default TextFields;
