import { Grid, Card as MaterialCard } from 'catamaran/core/mui';
import { useStyles } from './styles';
import React from 'react';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

type Props = {
  assigned?: boolean;
  cardContent: (hover: boolean) => React.ReactNode;
  cardLeftPanelContent: (hover: boolean) => React.ReactNode;
  className?: string;
  height?: number;
};

function Card(props: Props) {
  const classes = useStyles();
  const { assigned, cardContent, cardLeftPanelContent, className, height = 112 } = props;

  const [hover, hoverProps] = useHover();

  return (
    <MaterialCard
      className={clsx({
        [classes.cardRoot]: true,
        assigned,
        [className]: true,
        hover
      })}
      {...hoverProps}
    >
      <Grid
        className={clsx({
          [classes.cardContent]: true,
          assigned,
          hover
        })}
        container
        direction="row"
        style={{ height }}
      >
        <Grid
          className={clsx({
            [classes.cardLeftPanel]: true,
            assigned,
            hover
          })}
          container
          item
          xs
        >
          {cardLeftPanelContent(hover)}
        </Grid>
        <Grid
          className={clsx({
            [classes.cardRightPanel]: true,
            assigned,
            hover
          })}
          container
          item
          xs
        >
          {cardContent(hover)}
        </Grid>
      </Grid>
    </MaterialCard>
  );
}

export default Card;
