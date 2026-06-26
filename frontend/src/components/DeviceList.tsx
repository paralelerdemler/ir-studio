type Device = {
  ip: string;
  port: number;
  mac: string;
  type: number;
};

type Props = {
  devices: Device[];
};

function DeviceList({ devices }: Props) {
  if (devices.length === 0) {
    return (
      <div className="device-list">
        <h2>Devices</h2>

        <div className="device">
          <strong>No Broadlink device found</strong>
          <span>Make sure your device is powered on and connected.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="device-list">
      <h2>Devices</h2>

      {devices.map((device) => (
        <div className="device" key={device.mac}>
          <strong>Broadlink Device</strong>

          <span>{device.ip}</span>

          <small>
            {device.mac} • Port {device.port}
          </small>
        </div>
      ))}
    </div>
  );
}

export default DeviceList;