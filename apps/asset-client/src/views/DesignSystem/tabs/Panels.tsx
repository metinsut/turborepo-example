import {
  CatPanel,
  CatPanelActions,
  CatPanelContent,
  CatPanelHeader,
  CatTypography
} from 'catamaran/core';
import {
  ChangeButton,
  CloseIconButton,
  ConfirmButton,
  GoBackButton,
  TrashIconButton
} from 'catamaran/core/Button';
import { Theme, makeStyles } from 'catamaran/core/mui';
import PersonIcon from 'catamaran/icons/Person';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
};

function Panels(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <div className="flex">
        <CatPanel>
          <CatPanelHeader
            actionArea={
              <div className="grid grid-auto-flow-column gap-8">
                <CloseIconButton />
                <TrashIconButton />
              </div>
            }
            iconComponent={PersonIcon}
            title="Full Card Header"
          />
          <CatPanelContent>
            <CatTypography variant="body1">
              Chickpeas (3 cups). Chickpeas, also known as garbanzo beans, are the star ingredient
              in hummus. Canned or dry chickpeas? If you are wondering how to make hummus from
              scratch--the best, extra creamy, authentic stuff you will want to cook your own
              chickpeas from scratch (you will give them a good soak overnight + boil in water until
              well-done. More on this later)
            </CatTypography>
          </CatPanelContent>
          <CatPanelActions>
            <GoBackButton />
            <ConfirmButton />
          </CatPanelActions>
        </CatPanel>
      </div>
      <div className="mt16 flex">
        <CatPanel>
          <CatPanelHeader title="Full Card Header No Action" />
          <CatPanelContent>
            <CatTypography variant="body1">
              Garnish. Not to be underestimated. My favorite way to garnish a bowl of hummus, once
              the EVOO has been poured nicely right in the middle, is a few pinches of tangy sumac
              (sometimes ground cumin is a good addition). If you have some extra cooked chickpeas,
              plant them right in the middle. For a pop of green, you can add a garnish of fresh
              parsley.
            </CatTypography>
          </CatPanelContent>
        </CatPanel>
      </div>
      <div className="mt16 flex">
        <CatPanel className="w-half">
          <CatPanelHeader
            actionArea={
              <div className="grid grid-auto-flow-column gap-8">
                <CloseIconButton />
                <TrashIconButton />
              </div>
            }
            title="Half Header"
          />
          <CatPanelContent
            content={
              <CatTypography variant="body1">
                Garlic (1 or 2 cloves). Start with 1 clove and make sure it is finely minced. Tip:
                to tame its pungency, allow minced garlic to sit in a little bit of lemon juice for
                a few minutes.
              </CatTypography>
            }
          />
          <CatPanelActions>
            <ChangeButton />
          </CatPanelActions>
        </CatPanel>
      </div>
    </div>
  );
}

export default Panels;
