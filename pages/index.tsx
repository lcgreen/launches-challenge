import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useLaunches from 'hooks/useLaunches';
import usePayloads from 'hooks/usePayloads';
import Card from 'components/card';
import CardList from 'components/cardList';
import { Launch } from '@@/api/services/launches';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import CardHeader from 'components/cardHeader';

import styles from './index.module.scss';

const Launches: NextPage = () => {
  const { data, isError, isLoading } = useLaunches();
  const { data: payloadData, isLoading: isPayloadsLoading } = usePayloads();
  const [launches, setLaunches] = useState([]);

  // Sort launches by flight number and limit to 10
  useEffect(() => {
    if (data) {
      const sortedLaunches = data.body.sort((a, b) => a.flight_number - b.flight_number);
      setLaunches(sortedLaunches.slice(0, 10));
    }
  }, [data]);

  // If there is an error loading the launches, return an error message
  if (isError) return <div>failed to load</div>;
  if (isLoading || isPayloadsLoading) return <div className={styles.loading}>loading...</div>;

  // Get the payload data for the launch
  const getPayload = (id: string) => {
    return payloadData.body.find((payload) => payload.id === id);
  };

  // Set the color of the status icon
  const iconClass = (color) => styles[`icon-${color}`] || styles.default;

  // Set the status icon
  const StatusIcon = ({ status }): JSX.Element =>
    status === 'success' ? (
      <BsFillCheckCircleFill className={iconClass(status)} />
    ) : (
      <ImCross className={iconClass(status)} />
    );

  return (
    <main>
      <h1 className={styles.header}>Launches</h1>
      <CardList>
        {launches.map((item: Launch) => (
          <Card
            key={item.id}
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
              <li>Payload Id: {item.payload_id && getPayload(item.payload_id).id}</li>
              <li>Payload Type: {item.payload_id && getPayload(item.payload_id).type}</li>
            </ul>
          </Card>
        ))}
      </CardList>
    </main>
  );
};

export default Launches;
