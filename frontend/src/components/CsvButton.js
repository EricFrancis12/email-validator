import OutputButton from './OutputButton';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

function CsvButton(props) {
    const { emailData } = props;

    function downloadCsvFile(arr, fileName) {
        let header = ['email'];
        let body = '';
        arr.forEach(item => {
            for (const key in item) {
                if (!header.includes(key)) {
                    header.push(key.toString());
                }
            }
        });
        arr.forEach(item => {
            header.split(',').forEach(key => {
                if (item[key] != undefined) {
                    body += item[key].toString() + ',';
                }
            });
            body += '\n';
        });
        const csvString = header + '\n' + body;
        const csvBlob = new Blob([csvString], { type: 'text/csv' });

        const blobUrl = URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName.split('.').pop() === 'csv' ? fileName : `${fileName}.csv`;
        a.click();

        URL.revokeObjectURL(blobUrl);
    }

    return (
        <OutputButton icon={faFileCsv} text=".csv"
            onClickFunction={e => downloadCsvFile(emailData, `${Date.now()}.csv`)} />
    )
}

export default CsvButton;
