import styled from "styled-components";
import { useBookings } from "../bookings/useBookings";
// import { useRecentBookings } from "./useRecentBookings";
// import Spinner from "../../ui/Spinner";
// import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout(){
  // const {isLoading1, confirmedStays, numDays} = useRecentStays();

  // const {isLoading2, bookings} = useRecentBookings();
    const {bookings} = useBookings();
  
  const {cabins} = useCabins();

  // if(isLoading1 || isLoading2 || isLoading3)
  //   return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} numDays={5} cabinCount={cabins?.length} />
      {/* <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/> */}
      <SalesChart bookings={bookings} numDays={10} />
    </StyledDashboardLayout>
  );
  // return <>Dashboard</>
}

export default DashboardLayout;