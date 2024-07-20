import React, { useState } from 'react';
import { Card, CardMedia, Stack, Typography, Chip, Rating, Switch } from '@mui/material';

const ProfileCard = ({ image, location, isActive }) => {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="Profile"
        image={image}
      />
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Typography>{location}</Typography>
          <Stack direction="row" spacing={1} useFlexGap>
            <Chip
              size="small"
              label={active ? 'Active' : 'Inactive'}
              color={active ? 'success' : 'default'}
            />
            <Rating defaultValue={1} size="small" />
          </Stack>
        </Stack>
        <Switch checked={active} onChange={handleToggle} />
      </Stack>
    </Card>
  );
};

export default ProfileCard;
