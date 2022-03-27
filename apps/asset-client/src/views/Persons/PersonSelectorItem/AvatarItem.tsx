import { AvatarProps, CatAvatar } from 'catamaran/core';
import { Person, getPersonAvatar } from 'store/slices/persons';
import { User } from 'store/slices/users/details/types';
import { UsersListUser } from 'store/slices/users/list/types';
import { useMountedState } from 'react-use';
import { useTypedDispatch } from 'hooks';
import React, { useEffect, useMemo } from 'react';

type Props = AvatarProps & {
  fetchImage?: boolean;
  person?: Person;
  user?: User | UsersListUser;
};

function AvatarItem(props: Props) {
  const { className, fetchImage = false, person, user, ...rest } = props;

  const [avatar, setAvatar] = React.useState<string>('');

  const dispatch = useTypedDispatch();
  const isMounted = useMountedState();

  const userInfo = useMemo(() => {
    if (person) {
      return {
        firstName: person.firstName,
        id: person.id,
        lastName: person.lastName
      };
    }
    if (user) {
      return {
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName
      };
    }
    return null;
  }, [person, user]);

  useEffect(() => {
    const getAvatar = async () => {
      if (fetchImage) {
        const avatarUrl = await dispatch(getPersonAvatar(userInfo.id));
        if (isMounted()) {
          setAvatar(avatarUrl);
        }
      }
    };

    getAvatar();
  }, [dispatch, fetchImage, isMounted, userInfo?.id]);

  const renderLetters = useMemo(() => {
    // TODO: Change this locale information
    const firstLetter = userInfo?.firstName?.[0] ?? '';
    const secondLetter = userInfo?.lastName?.[0] ?? '';

    return firstLetter + secondLetter;
  }, [userInfo?.firstName, userInfo?.lastName]);

  if (!person && !user) {
    return null;
  }

  return (
    <CatAvatar
      alt={`${userInfo.firstName} ${userInfo.lastName}`}
      className={className}
      src={avatar}
      {...rest}
    >
      {renderLetters}
    </CatAvatar>
  );
}

export default AvatarItem;
