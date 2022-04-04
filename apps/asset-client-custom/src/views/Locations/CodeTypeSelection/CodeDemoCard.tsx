import { Box, Card, Divider, Grid, Typography, styled } from 'catamaran/core/mui';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import EditIcon from 'catamaran/icons/Edit';
import GearsIcon from 'catamaran/icons/Gears';
import LockIcon from 'catamaran/icons/Lock';
import React, { CSSProperties } from 'react';
import clsx from 'clsx';

const AutoCodeBox = styled(Box)(() => ({
  background: 'linear-gradient(180deg, #40dba3 0%, #54dfad 100%)'
}));

const ManualCodeBox = styled(Box)(({ theme }) => ({
  background: theme.palette.darkGrey.main,
  opacity: '0.8'
}));

const SubtitleStyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkGrey.main,
  height: '0.4rem',
  opacity: '0.2',
  width: '20%'
}));

type Props = {
  className?: string;
  type: 'autoCode' | ('manual' & string);
  style?: CSSProperties;
};

function CodeDemoCard(props: Props) {
  const { className, type, style } = props;

  const CodeBox = type === 'autoCode' ? AutoCodeBox : ManualCodeBox;
  const codeText = type === 'autoCode' ? 'BRD1234' : '123456789';
  const CodeIcon = type === 'autoCode' ? LockIcon : EditIcon;

  return (
    <Card className={clsx('radius-16 mt16 py8 px12', className)} style={style}>
      <Box
        className="bg-darkgray grid radius-4 align-items-center opacity-2"
        height="1rem"
        margin="0.3rem"
        width="20%"
      />
      <Divider className="my6" />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <CodeBox
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="1.4rem"
            margin="0.3rem"
          >
            <Grid alignItems="center" container>
              <Grid alignItems="center" container item style={{ padding: '5px' }} xs={3}>
                <Typography
                  className="c-main-lightgray"
                  fontSize="10px"
                  fontWeight="bold"
                  lineHeight="88.12%"
                >
                  Code
                </Typography>
              </Grid>
              <Divider className="divider-vertical m4" />
              {type === 'autoCode' && <GearsIcon className="c-main-lightgray" fontSize="small" />}
              <Grid alignItems="center" container item xs>
                <Typography
                  className="c-main-lightgray"
                  fontSize="10px"
                  fontWeight="bold"
                  lineHeight="88.12%"
                >
                  {codeText}
                </Typography>
              </Grid>
              <Grid alignItems="center" container item xs={1}>
                <CodeIcon className="c-main-lightgray" fontSize="small" />
              </Grid>
            </Grid>
          </CodeBox>
        </Grid>
        <Grid item xs={6}>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="1.4rem"
            margin="0.3rem"
          >
            <Grid alignItems="center" container direction="row">
              <SubtitleStyledBox
                className="grid radius-4 align-items-center"
                height="1.4rem"
                margin="0.3rem"
              />
              <ArrowRightIcon fontSize="small" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="1.4rem"
            margin="0.3rem"
          >
            <SubtitleStyledBox
              className="grid radius-4 align-items-center"
              height="1.4rem"
              margin="0.3rem"
            />
          </Box>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="1.4rem"
            margin="0.3rem"
          >
            <SubtitleStyledBox
              className="grid radius-4 align-items-center"
              height="1.4rem"
              margin="0.3rem"
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="3.1rem"
            margin="0.3rem"
          >
            <Grid alignItems="center" container direction="row">
              <SubtitleStyledBox
                className="grid radius-4 align-items-center"
                height="1.4rem"
                margin="0.3rem"
              />
              <ArrowRightIcon fontSize="small" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <SubtitleStyledBox
            className="grid radius-4 align-items-center"
            height="1.4rem"
            margin="0.3rem"
          />
        </Grid>
        <Grid item xs={6}>
          <SubtitleStyledBox
            className="grid radius-4 align-items-center"
            height="1.4rem"
            margin="0.3rem"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="2.4rem"
            margin="0.3rem"
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            className="grid bg-lightGrey radius-4 w-full align-items-center"
            height="2.4rem"
            margin="0.3rem"
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default CodeDemoCard;
