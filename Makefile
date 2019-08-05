# This is the author's tip jar address. Feel free to donate.
# You can either replace this address with your own, invoke
# `make install # ADDRESSES={YOUR ADDRESSES HERE}`
# If there is more then one address, comma-separate them.
# or simply modify the address file with your own address.
ADDRESSES=0xcC80600c5424FE49D3CedC0AD08E76591C0eD995

.PHONY: install uninstall
address_file=addresses.json
escalate=echo "May need sudo:" && sudo


$(address_file):
	printf '"%s"' $(ADDRESSES) > $(address_file)

install: $(address_file)
	npm install
	npm link || $(escalate) npm link

uninstall:
	@npm unlink || $(escalate) npm unlink

clean:
	rm $(address_file)
