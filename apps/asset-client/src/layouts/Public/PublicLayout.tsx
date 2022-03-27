import { Typography } from 'catamaran/core/mui';
import BordaText from 'catamaran/icons/BordaText';
import React from 'react';
import classes from './PublicLayout.module.scss';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => (
  <main className={clsx(classes.container, 'p8 h-screen')}>
    <section className={clsx(classes['image-wrapper'], 'h-full radius-16')}>
      <img
        alt="lighthouse-fullscreen"
        className={clsx(classes['image-wrapper__img'], 'cover')}
        src="/static/images/lighthouse-fullscreen.png"
      />
      <div className={clsx(classes['image-wrapper__bg'], 'bg-borda3 opacity-6')} />
      <div className={clsx(classes['image-wrapper__info'], 'opacity-6')}>
        <Typography
          className={clsx(classes['image-wrapper__text--italic'], 'opacity-6 c-main-lightgray')}
          variant="body1"
        >
          “There is, one knows not what sweet mystery about this sea, whose gently awful stirrings
          seem to speak of some hidden soul beneath...”
        </Typography>
        <Typography
          className={clsx(classes['image-wrapper__text'], 'opacity-4 c-main-lightgray')}
          variant="body1"
        >
          Herman Melville, Moby-Dick or, the Whale
        </Typography>
      </div>
      <div className={classes['image-wrapper__bordaIcon']}>
        <BordaText fontSize="large" height={18} viewBox="0 0 56 18" width={56} />
      </div>
    </section>
    <section className={classes['content-wrapper']}>
      <img
        alt="lighthouse-quattro"
        className={classes['content-wrapper__header-img']}
        src="/static/images/lighthouse-quattro.png"
      />
      <div className={classes['content-wrapper__body']}>{children}</div>
      <div className={classes['content-footer']} />
    </section>
  </main>
);

export default PublicLayout;
