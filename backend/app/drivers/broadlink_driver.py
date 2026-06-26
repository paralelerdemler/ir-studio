import base64
import time
import broadlink


class BroadlinkDriver:
    def discover(self):
        devices = broadlink.discover(timeout=5)

        result = []

        for device in devices:
            result.append({
                "ip": device.host[0],
                "port": device.host[1],
                "mac": device.mac.hex(),
                "type": device.devtype,
            })

        return result

    def auth_test(self):
        device = self._get_first_device()

        return {
            "ip": device.host[0],
            "mac": device.mac.hex(),
            "type": device.devtype,
        }

    def _get_first_device(self):
        devices = broadlink.discover(timeout=5)

        if not devices:
            raise RuntimeError("No Broadlink device found")

        device = devices[0]
        device.auth()

        return device

    def learn(self):
        device = self._get_first_device()

        device.enter_learning()
        time.sleep(8)
        packet = device.check_data()

        if not packet:
            raise RuntimeError("No IR signal captured")

        return {
            "length": len(packet),
            "code": base64.b64encode(packet).decode("utf-8"),
        }

    def send(self, code):
        device = self._get_first_device()

        packet = base64.b64decode(code)
        device.send_data(packet)

        return True

    def clear_learning_buffer(self):
        device = self._get_first_device()
        packet = device.check_data()

        if packet:
            return {
                "cleared": True,
                "length": len(packet),
            }

        return {
            "cleared": False,
            "length": 0,
        }