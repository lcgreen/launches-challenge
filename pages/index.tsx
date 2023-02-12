import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useLaunches from 'hooks/useLaunches';
import Card from 'components/card';
import CardList from 'components/cardList';
import { Launch } from '@@/api/services/launches';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import CardHeader from 'components/cardHeader';

import styles from './index.module.scss';
import Modal from 'components/modal';
import LaunchDocument from '@@/api/schema/v5/launchDocument';

const Launches: NextPage = () => {
  const { data, isError, isLoading } = useLaunches();
  const [show, setShow] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch>(null);

  // If there is an error loading the launches, return an error message
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div className={styles.loading}>loading...</div>;

  // Set the color of the status icon
  const iconClass = (color) => styles[`icon-${color}`] || styles.default;

  // Set the status icon
  const StatusIcon = ({ status }): JSX.Element =>
    status === 'success' ? (
      <BsFillCheckCircleFill className={iconClass(status)} />
    ) : (
      <ImCross className={iconClass(status)} />
    );

  // Hide the modal
  const handleHideModal = () => {
    setShow(false);
    setSelectedLaunch(null);
  };

  // Create the table of payload data
  const table = () => {
    if (!selectedLaunch?.payload) return <>No payload items</>;
    const rows = Object.entries(selectedLaunch.payload).map(([key, value]) => {
      let displayValue: any = '';
      if (typeof value === 'object' || Array.isArray(value)) {
        displayValue = JSON.stringify(value);
      } else {
        displayValue = value;
      }
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{displayValue}</td>
        </tr>
      );
    });

    return (
      <table onClick={handleHideModal}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <main>
      <h1 className={styles.header}>Launches</h1>
      <CardList>
        {data.body.map((item: Launch) => (
          <div
            key={item.id}
            data-testid={`card-${item.id}`}
            onClick={() => {
              setShow(true);
              setSelectedLaunch({ ...item });
            }}
          >
            <Card
              header={
                <CardHeader
                  {...item}
                  title={item.name}
                  imageAlt={item.name}
                  imageHeight={48}
                  imageWidth={48}
                  status={item.success ? 'success' : 'error'}
                  utcDate={item.date_utc}
                />
              }
            >
              <ul className={styles.list}>
                <li>
                  <div className={styles.status}>
                    <StatusIcon status={item.success ? 'success' : 'error'} />
                    {item.success && <span>{'Successful Launch'}</span>}
                    {item.failures[0]?.reason && <div>Failure: {item.failures[0]?.reason}</div>}
                  </div>
                </li>
                <li>Serial: {item.serial}</li>
                <li>Payload Id: {item?.payload?.id}</li>
                <li>Payload Type: {item?.payload?.type}</li>
              </ul>
            </Card>
          </div>
        ))}
      </CardList>
      <Modal show={show} hideModal={handleHideModal}>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalHeader}>{`Payload Information for ${selectedLaunch?.name}`}</h2>
          {selectedLaunch && table()}
        </div>
      </Modal>
    </main>
  );
};

export default Launches;
