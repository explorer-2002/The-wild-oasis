
import { useNavigate } from 'react-router-dom'
// import { HiOutlineUser } from 'react-icons/hi2'
import styled from 'styled-components'
import ButtonIcon from '../ui/ButtonIcon'
import Logout from '../features/authentication/Logout'
import DarkModeToggle from './DarkModeToggle'
import { getUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import defaultUser from '../../public/default-user.jpg';


const StyledHeaderMenu = styled.ul`
    display:flex;
    gap:0.4rem;
`
const Avatar = styled.img`
  display: block;
  width: 2.2rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <StyledUserAvatar>
            <Avatar src={`${user?.avatar ?? defaultUser}`} alt={`avatar of Person`} />
            {/* <span>{fullName}</span> */}
          </StyledUserAvatar>        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}
