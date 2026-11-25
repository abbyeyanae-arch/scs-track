## 1 Context
Tested network diagnostics, router hardening, and DHCP reservation workflows on the lab setup.

## 2 Approach
Followed the troubleshooting ladder bottom-to-top, logging each step and what changed.

## 3 Evidence
Recorded `net-look` output, troubleshooting steps, router hardening status, and a clean router screenshot.

## 4 Trade-offs
Reserved printer addressing prevents drift, while strict firewall/sharing settings add setup steps.

## 5 Verification
Re-ran checks after restoring normal settings and confirmed test pages and `check-scs4.1` output.

## 6 What I might be wrong about
I might misread a transient DHCP lease or overlook a hidden subnet rule; I would verify directly against router leases and re-test after a reboot.
