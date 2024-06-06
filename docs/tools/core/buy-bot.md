# Balancer Pool Buy Bot

This tool has been created by [Bleu Studios](https://github.com/bleu/monorepo) to assist projects increasing awareness of their token sales by automatically sharing transactions with their community groups on Telegram.

![AlertExample](/images/toolshub/BuyBot/AlertExample.png)

### How to use

Initialise by adding [@token_watcher_buy_bot](https://t.me/token_watcher_buy_bot) on Telegram and typing /start or selecting from the menu.

To add a token, type /addtoken or select from the menu and click "Select Group" below the text input. Select the group where the bot is to be added ensuring you are the owner or an admin to have correct permissions.

![AddToken](/images/toolshub/BuyBot/AddToken.png)

Select the chain

Enter the token address

You will get a success message for your Buy Bot subscription with showing the current configuration.

![AddTokenSuccess](/images/toolshub/BuyBot/AddTokenSuccess.png)

### Alerts will include
- Alert Image - (customizable through /manage -> settings menu)
- Trade size indicator via # of emojis - (# of tokens per emoji is customizable)
- [tokenName] Purchased! - (link token name text to token address)
- Spent: [tokenIn]
- Bought: [tokenOut]
- Price: 1 [token] = $ [USD]
- Links: TX | Buy | Deposit | Chart 
    - TX - transaction record on chain explorer
    - Buy - link to cowswap/1inch
    - Deposit - link to Balancer pool
    - Chart: Link to Dexscreener (where supported)

### Customizing your bot

**Default Settings**
- Alert Image: none
- Trade emoji step size: 1 emoji = 10 tokens
- Minimum buy amount: 1.0
- Paused: false
- Lanuguage: English

Bot can be updated through the /manage menu. 

![ManageMenu](/images/toolshub/BuyBot/ManageMenu.png)

**Functions** 
- Pause: Pauses alerts from the selected alert but does not unsubscribe
- Restart: Unpauses a paused alert
- Unsubscribe: Unsubscrbes from the selected alert
- Manage Links: Shows links on alert and allows for more link to be added such as project website, Discord, X etc. These are added by entering a label and URL for the new link in the format: label,url
- Change Settings:
    - Alert Image URL: Add the URL for an image/gif to be displayed at the top of alert messages
    - Min Buy Amount: Size of buy for an alert to be triggers. Default is 1.0 tokens
    - Trade Size Emoji: Set the emoji to indicate trade size. This should be an emoji, text entered here will return the string of text and look pretty ridiculous.
    - Trade Size Step: Default is 1 emoji = 10 tokens. Enter the number of tokens each emoji is to signify. More emojis mean a larger trade.

---

Reach out on [Discord](https://discord.balancer.fi/) for any assistance.