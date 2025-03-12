import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";
import BasicTable from "../../../components/Table";
import { Button, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const MyPublications = () => {
  return (
    <Page withPadding >
      <AccountWrapperWidget>
        <Stack spacing={2} flexGrow={1}>
          <Stack direction="row" spacing={2}>
          <TextField size="small" sx={{flexGrow: 1}} label="Search" />
            <Button startIcon={<SearchIcon/>} variant="contained">Search</Button>
            <Button startIcon={<AddIcon/>} variant="contained">Create Publication</Button>
          </Stack>
        <BasicTable/>
        </Stack>
      </AccountWrapperWidget>
    </Page>
  );
};

export default MyPublications;
