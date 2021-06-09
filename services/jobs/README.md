# Discord Bot Processing Jobs

Discord does not provide a robust API for searching chat messages. It only provides a simple chat log that can be paginated through.

In order to count slayer contracts, all of a channel's message history must be retrieved and analyzed for contract mentions.

This service performs an initial/nightly job to scan a channel's chat log and calculate all the contracts.
