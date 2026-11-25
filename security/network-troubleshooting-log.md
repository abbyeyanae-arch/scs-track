## Fault 1
Symptom: Workstation could not reach the local gateway.
My guess: cable
The rung I expected: 2
The rung that failed: 2
The fault was: Loose patch cable at the wall jack.
Fixed by: Reseated and swapped to a known-good cable.
Put back: Returned original cable after testing and verified link.

| Step | What I changed | What changed |
| :--- | :--- | :--- |
| 1 | Checked link light on NIC | nothing |
| 2 | Replaced patch cable | Link came up and gateway ping replied |

## Fault 2
Symptom: Station lost name resolution to local host.
My guess: network
The rung I expected: 5
The rung that failed: 5
The fault was: Incorrect DNS setting on station interface.
Fixed by: Set DNS back to automatic DHCP.
Put back: Verified station IP and DNS returned to normal.

| Step | What I changed | What changed |
| :--- | :--- | :--- |
| 1 | Tested ping to gateway IP | nothing |
| 2 | Restored automatic DNS | Local name lookup succeeded |

## Fault 3 -- fault card, I was the fixer
Symptom: Lab device had no IP address on the subnet.
My guess: device
The rung I expected: 3
The rung that failed: 3
The fault was: Static IP conflict on lab device.
Fixed by: Switched interface back to automatic DHCP.
Put back: Confirmed DHCP lease and lab device reset.
Proved on the lab device: Rungs 1 through 4 passed after fix.
Card number: 27
Sealed log fingerprint:

| Step | What I changed | What changed |
| :--- | :--- | :--- |
| 1 | Inspected link LEDs | nothing |
| 2 | Switched IPv4 to DHCP | Obtained valid subnet address |

## The card I planted
Card number: 28
The step break.sh printed: Set static address outside subnet.
The undo: Restored automatic DHCP and verified lease renewal.
