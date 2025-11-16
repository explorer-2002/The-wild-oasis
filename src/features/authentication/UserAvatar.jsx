import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../../store/slices/userSlice";
// import { useUser } from "./useUser";
import defaultUser from '../../../public/default-user.jpg';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  // const {user} = useUser();
  // const {fullName, avatar} = user.user_metadata;
  const user = useSelector(getUser);
  console.log('User: ', user?.avatar);

  return (
    <StyledUserAvatar>
      <Avatar src={`${user?.avatar ?? defaultUser}`} alt={`avatar of Person`} />
      {/* <span>{fullName}</span> */}
    </StyledUserAvatar>
  )
}

export default UserAvatar;