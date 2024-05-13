import {
  Button,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React, { useMemo } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import BookIcon from '@mui/icons-material/Book';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { usePopUpContext } from '@/context/PopUpContext';

import CreateClass from '../CreateClass';

function SideBar() {
  const [open, setOpen] = React.useState<number | undefined>(undefined);
  const { openPopUp } = usePopUpContext();
  const listClass = useMemo(
    () => [
      {
        id: 1,
        icon: <BookIcon />,
        name: 'Ielts',
        children: [
          {
            id: 1,
            name: 'lớp1',
          },
        ],
      },
      {
        id: 2,
        icon: <AutoStoriesIcon />,
        name: 'Toeic',
        children: [
          {
            id: 2,
            name: 'lớp1',
          },
        ],
      },
    ],
    []
  );
  return (
    <div className="h-full pt-[20px]">
      <div className="flex items-center justify-between pb-3">
        <span>Thầy: Dũng</span>
        <Button onClick={() => openPopUp({ contents: <CreateClass /> })} variant="outlined">
          Tạo lớp
        </Button>
      </div>
      <Divider />
      <div>
        <List
          aria-labelledby="nested-list-subheader"
          component="nav"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Danh sách lớp học
            </ListSubheader>
          }
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          {listClass.map((list) => (
            <>
              <ListItemButton key={list.id} onClick={() => setOpen(list.id)}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
                {open === list.id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open === list.id} timeout="auto" unmountOnExit>
                {list.children.map((child) => (
                  <List component="div" disablePadding sx={{ pl: 2 }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={child.name} />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            </>
          ))}
        </List>
      </div>
    </div>
  );
}

export default SideBar;
