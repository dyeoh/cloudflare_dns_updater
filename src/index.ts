import { publicIpv4 } from 'public-ip';
import { getRecord, updateRecord, createRecord, CLOUDFLARE_DOMAIN } from './cloudflare.js';

// const updateRecords = ()

const func = async () => {
  // console.log(arg)
  const content = await publicIpv4();

  console.log('Fetching record');
  const { data } = await getRecord();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const record = data?.result.find((obj: any) => obj.type === 'A' && obj.name === CLOUDFLARE_DOMAIN);

  if (record) {
    if (record.content === content) {
      console.log('IP SAME - Skipping');
    } else {
      try {
        console.log('Record found but does not match - Updating');
        await updateRecord(content, record.id);
        console.log('Successfully updated record');
      } catch (err) {
        console.log('Failed to update record');
      }
    }
  } else {
    try {
      console.log('No record found - creating record');
      await createRecord(content);
      console.log('Successfully created record');
    } catch (err) {
      console.log('Failed to create record');
    }
  }
};

(async function () {
  setInterval(func, 10000);
})();
