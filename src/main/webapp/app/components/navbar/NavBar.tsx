import React from 'react';
import './nav.scss';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LayersIcon from '@material-ui/icons/Layers';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 70,
    
  },
  brand: {
    lineHeight: 1,
    marginRight: 'auto'
  },
  link: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  linkBrand: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  primaryAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  iconWrapper: {
    minWidth: 40,
  },
  icon: {
    color: theme.palette.text.hint
  },
  drawerContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    width: 300,
  },

}));

export default function NavBar(props) {
  const classes = useStyles();

  const content = {
    'brand': { image: '../../../content/images/LOGO-WEB@2x.png', width: 200 },
    'link1': 'Home',
    'link2': 'About',
    'link3': 'Bounties',
    ...props.content
  };

  const getBrand = () => {
    let brand: JSX.Element;

    if (content.brand.image) {
      brand = <img src={content.brand.image} alt="Bounties Logo" width={content.brand.width} />;
    } else {
      brand = content.brand.text || '';
    }

    return brand;
  }

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open });
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} className="menuBar">
      <Toolbar className={classes.toolbar}>
        <Link href="#" color="primary" underline="none" variant="h5" className={classes.brand}>
          {getBrand()}
        </Link>
        <Link href="#" className={`${classes.link}`}>
          <a href="#" className="nav__link">{content['link1']}</a>
        </Link>
        <Link href="#" className={classes.link}>
          <a href="#" className="nav__link">{content['link2']}</a>
        </Link>
        <Link href="#" className={classes.link}>
          <a href="#" className="nav__link">{content['link3']}</a>
        </Link>
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <Box mb={1} ml={2} pb={2} border={1} borderTop={0} borderLeft={0} borderRight={0} borderColor="background.emphasis">
            <Link href="#" color="primary" underline="none" variant="h5" className={classes.linkBrand}>
              {getBrand()}
            </Link>
          </Box>
          <List>
            <ListItem button key={content['link1']}>
              <ListItemIcon className={classes.iconWrapper}>
                <LayersIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={content['link1']} />
            </ListItem>
            <ListItem button key={content['link2']}>
              <ListItemIcon className={classes.iconWrapper}>
                <FilterHdrIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={content['link2']} />
            </ListItem>
            <ListItem button key={content['link3']}>
              <ListItemIcon className={classes.iconWrapper}>
                <DirectionsBusIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={content['link3']} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}
