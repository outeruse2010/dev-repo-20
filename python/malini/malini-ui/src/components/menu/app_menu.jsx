import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DueDetail from '../content/dues/due_detail';
import Customers from '../content/customer/Customers';

const drawerWidth = 240;

const menu_items = [
  {"title": "Customers","component": Customers, "path": "/customers", "icon": "", "divide": false}
  ,{"title": "Due Detail","component": DueDetail, "path": "/due_detail", "icon": "", "divide": false}
                    ];

export default function AppMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const onMenuOpen = () => {
    setOpen(true);
  };

  const onMenuClose = () => {
    setOpen(false);
  };

  return (
    
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} >
        <Toolbar>
          <IconButton  onClick={onMenuOpen} color="inherit" aria-label="open drawer"  edge="start" className={clsx(classes.menuButton, open && classes.hide)} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap> Malini </Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper}} >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onMenuClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu_items.map((mnu, index) => 
           <div key={index}>
              <ListItem button key={mnu.title}>
                <Link to={mnu.path} style={{textDecoration: 'inherit'}}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>    */ }
                  <ListItemText primary={mnu.title} />
                </Link>
              </ListItem>
              {mnu.divide && <Divider key={index}/>}
           </div>
          )}
        </List>
        <Divider />

      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open, })} >
        <div className={classes.drawerHeader} />
          {menu_items.map(r => <Route path={r.path} exact component={r.component} key={r.title}/> )}
      </main>
      </Router>
    </div>
    
  );
}

function Home(){
  return <div> Test Home</div>
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
