import { CatKeyboardButton } from 'catamaran/core';
import FilterIcon from 'catamaran/icons/Filter';
import classes from '../Users.module.scss';
import clsx from 'clsx';

const FilterFooter = () => (
    <div className={clsx(classes.filter_footer, 'absolute w-full radius-bot-16 elev-7 bot-0')}>
      <CatKeyboardButton color="blue" endIcon={<FilterIcon />} keyboardKey="enter" size="medium">
        Filter
      </CatKeyboardButton>
    </div>
  );

export default FilterFooter;
