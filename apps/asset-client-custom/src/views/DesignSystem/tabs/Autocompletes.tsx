import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { FilmOptionType, top100Films } from './SelectComponent';
import { useState } from 'react';
import AutocompleteAsync from 'catamaran/core/Autocomplete/AutocompleteAsync';
import CatAutocomplete from 'catamaran/core/Autocomplete/Autocomplete';
import CreatableAutocomplete from 'catamaran/core/Autocomplete/CreatableAutocomplete';

function Autocompletes() {
  const [selectedCatOptions, setSelectedCatOptions] = useState<string | string[]>([]);
  const [selectedCatOptionsWithObject, setSelectedCatOptionsWithObject] = useState<
    namesWithIdsType | namesWithIdsType[]
  >([]);
  const [selectedCatOptionsSingle, setSelectedCatOptionsSingle] = useState<string | string[]>(null);
  const [selectedCatOptionsWithObjectSingle, setSelectedCatOptionsWithObjectSingle] = useState<
    namesWithIdsType | namesWithIdsType[]
  >(null);
  const [selectedFreeSolo, setSelectedFreeSolo] = useState<string | string[]>(null);
  const [selectedAsync, setSelectedAsync] = useState<string | string[]>(null);
  const [selectedGroupBy, setSelectedGroupBy] = useState<FilmOptionType | FilmOptionType[]>([]);
  const [selectedGroupByFirstLetter, setSelectedGroupByFirstLetter] = useState<
    FilmOptionType | FilmOptionType[]
  >([]);

  const [selectedCreatable, setSelectedCreatable] = useState<string | string[]>(null);
  const [selectedCreatableAsync, setSelectedCreatableAsync] = useState<string | string[]>(null);

  const [creatableLoading, setCreatableLoading] = useState(false);

  const handleChangeCatAutocomplete = (value: string | string[]) => {
    setSelectedCatOptions(value);
  };
  const handleChangeCatAutocompleteWithObject = (value: namesWithIdsType | namesWithIdsType[]) => {
    setSelectedCatOptionsWithObject(value);
  };

  const handleChangeCatAutocompleteSingle = (value: string | string[]) => {
    setSelectedCatOptionsSingle(value);
  };
  const handleChangeCatAutocompleteWithObjectSingle = (
    value: namesWithIdsType | namesWithIdsType[]
  ) => {
    setSelectedCatOptionsWithObjectSingle(value);
  };

  const handleChangeFreeSolo = (value: string | string[]) => {
    setSelectedFreeSolo(value);
  };
  const handleChangeAsync = (value: string | string[]) => {
    setSelectedAsync(value);
  };

  const handleChangeGroupBy = (value: FilmOptionType | FilmOptionType[]) => {
    setSelectedGroupBy(value);
  };
  const handleChangeGroupByFirstLetter = (value: FilmOptionType | FilmOptionType[]) => {
    setSelectedGroupByFirstLetter(value);
  };

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const handleChangeCreatable = (value: string | string[]) => {
    setSelectedCreatable(value);
  };
  const handleChangeCreatableAsync = (value: string | string[]) => {
    if (value !== '') {
      fetchAsyncAddButton();
    }
    setSelectedCreatableAsync(value);
  };

  const fetchAsyncFunction = async () => {
    await sleep(1e3); // For demo purposes.
    return names;
  };
  const fetchAsyncAddButton = async () => {
    setCreatableLoading(true);
    await sleep(1e3); // For demo purposes.
    setCreatableLoading(false);
    return names;
  };

  return (
    <>
      <CatPanel className="my16 p16">
        <CatPanelHeader title="CatAutocompletes" />
        <CatPanelContent>
          <div className="grid gap-8">
            <div className="grid gap-8 grid-auto-flow-column">
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option}
                getOptionValue={(option) => option}
                label="Multi Select"
                limitTags={2}
                multiple
                onChange={handleChangeCatAutocomplete}
                options={names}
                selectedValues={selectedCatOptions}
              />
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option}
                label="Multi Object Select"
                limitTags={2}
                multiple
                onChange={handleChangeCatAutocompleteWithObject}
                options={namesWithIds}
                selectedValues={selectedCatOptionsWithObject}
              />
            </div>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-8 grid-auto-flow-column">
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option}
                getOptionValue={(option) => option}
                label="Single Select"
                onChange={handleChangeCatAutocompleteSingle}
                options={names}
                selectedValues={selectedCatOptionsSingle}
                value={selectedCatOptionsSingle}
              />
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option}
                label="Single Object Select"
                onChange={handleChangeCatAutocompleteWithObjectSingle}
                options={namesWithIds}
                selectedValues={selectedCatOptionsWithObjectSingle}
              />
            </div>
          </div>
        </CatPanelContent>
      </CatPanel>
      <CatPanel className="my16 p16">
        <CatPanelHeader title="CatAutocompletes" />
        <CatPanelContent>
          <div className="grid gap-8">
            <div className="grid gap-8 grid-auto-flow-column">
              {
                // FreeSolo can't be used with objects. Can't be multiselect.
                // Can't be used with groupBy.
                // Can be used with groupByFirstLetter.
              }
              <CatAutocomplete
                className="m4"
                freeSolo
                getOptionValue={(option) => option}
                label="Free Solo"
                onChange={handleChangeFreeSolo}
                options={names}
                selectedValues={selectedFreeSolo}
                value={selectedFreeSolo}
              />
              <AutocompleteAsync<string, string>
                className="m4"
                fetchResults={fetchAsyncFunction}
                getOptionValue={(option) => option}
                label="Asynchronous"
                onChange={handleChangeAsync}
                selectedValues={selectedAsync}
              />
            </div>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-8 grid-auto-flow-column">
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option}
                groupBy={(option) => option.year.toString()}
                label="GroupBy"
                limitTags={2}
                multiple
                onChange={handleChangeGroupBy}
                options={top100Films}
                selectedValues={selectedGroupBy}
              />
              <CatAutocomplete
                className="m4"
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option}
                groupByFirstLetter
                label="GroupBy First Letter"
                limitTags={2}
                multiple
                onChange={handleChangeGroupByFirstLetter}
                options={top100Films}
                selectedValues={selectedGroupByFirstLetter}
              />
            </div>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-8 grid-auto-flow-column">
              <CreatableAutocomplete
                addHintObjectName="Namef"
                blurOnSelect
                className="m4"
                displayAddButtonWhenNoMatch
                freeSolo
                getOptionValue={(option) => option}
                label="Select Name"
                onChange={handleChangeCreatable}
                options={names}
                selectedValues={selectedCreatable}
              />
              <CreatableAutocomplete
                blurOnSelect
                className="m4"
                displayAddButtonWhenNoMatch
                freeSolo
                getOptionValue={(option) => option}
                label="Select Item"
                loading={creatableLoading}
                onChange={handleChangeCreatableAsync}
                options={names}
                selectedValues={selectedCreatableAsync}
              />
            </div>
          </div>
        </CatPanelContent>
      </CatPanel>
    </>
  );
}

type namesWithIdsType = {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
};

export const namesWithIds: namesWithIdsType[] = [
  { gender: 'Male', id: '1', name: 'Oliver Hansen' },
  { gender: 'Male', id: '2', name: 'Van Henry' },
  { gender: 'Female', id: '3', name: 'April Tucker' },
  { gender: 'Male', id: '4', name: 'Ralph Hubbard' },
  { gender: 'Male', id: '5', name: 'Omar Alexander' },
  { gender: 'Male', id: '6', name: 'Carlos Abbott' },
  { gender: 'Female', id: '7', name: 'Miriam Wagner' },
  { gender: 'Male', id: '8', name: 'Bradley Wilkerson' },
  { gender: 'Female', id: '9', name: 'Virginia Andrews' },
  { gender: 'Female', id: '10', name: 'Kelly Snyder' }
];

export const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

export default Autocompletes;
