export const earlyPenaltyHint =
  `The penalty coefficient indicating the penalty speed for early unlock. Must be between 0 and 50. Default value is 10 means that penalty has linear speed.

If Early Penalty is set, can be it changed later, and if yes, by whom?
It can be changed only by admin

Why would someone use it?
In case admin wants to allow users ti withdraw their locks before lock time is finished

How does it work? Lets review examples
    L - lock amount
    k - penalty coefficient, defined by admin (default 1)
    Tleft - left time to unlock
    Tmax - MAXLOCK time
    Penalty amount = L * k * (Tlast / Tmax)

Example 1: Early Penalty is set to 10 (means k=1 in the formula). If user locked 1,000 tokens for max lock time 52 weeks (1 year). User wants to withdraw with penalty after 1 week, => he will withdraw 1000 - 1000*1*(51/52) = 19 tokens. 
If user withdraws after 36 weeks, he will withdraw 1000 - 1000*1*(16/52) = 692  tokens. 

Example 2: Early Penalty is set to 5 (means k=0.5 in the formula). If user locked 1,000 tokens for 52 weeks (1 year). User wants to withdraw with penalty after 1 week, > he will withdraw 1000 - 1000*0.5*(51/52) = 509 tokens tokens. 
If user withdraws after 36 weeks, he will withdraw 1000 - 1000*0.5*(16/52) = 846 tokens.. 

Example 3: Early Penalty is set to 0. If user locked 1,000 tokens for 52 weeks (1 year). User wants to withdraw with penalty after 1 week, > he will withdraw 1000 - 1000*0*(51/52) = 1000 tokens tokens. 
If user withdraws after 36 weeks, she will withdraw 1000 tokens. 

Example 3: Early Penalty is set to 50. If user locked 1,000 tokens for 52 weeks (1 year). User wants to withdraw with penalty after 1 week, > she will withdraw 1000 - 1000*5*(51/52) = 0 tokens tokens. 
If user withdraws after 36 weeks, she will withdraw 1000 - 1000*5*(16/52) = 0  tokens. 

Example 4: Early Penalty is set to 20. If user locked 1,000 tokens for 52 weeks (1 year). User wants to withdraw with penalty after 1 week, > she will withdraw  1000 - 1000*2*(51/52) = 0  tokens. 
If user withdraws after 36 weeks, she will withdraw 1000 - 1000*2*(16/52) = 384 tokens.`.replaceAll(
    '\n',
    '<br/>'
  );

export const rewardDistributionStartTimeHint =
  `The beginning week of a reward program. The earliest possible date is the upcoming Thursday (unixtime).

How does it work?
The start of reward program can be postponed for any weeks. Creator can choose any week in the future.`.replaceAll(
    '\n',
    '<br/>'
);

export const setAvailableRewardsHint = `How does it work?
Sets allowing reward token (or list of tokens).

Example 1:
The admin wants to add tokens that will be used for distributing rewards to users. To do this, the user provides the addresses of the tokens and performs a transaction to add them. After the transaction is completed, the tokens can be used for reward distribution`.replaceAll(
  '\n',
  '<br/>'
);

export const addRewardsIntoCurrentWeekHint = `How does it work?
Providing rewards into current week. (Week start from lats Thursday at 00:00:00 UTC and ends next Wednesday at 23:59:59 UTC)

Example 1:
The user wants to add reward tokens that will be distributed in the current week. For example, the user adds 100 reward tokens for distribution. To do this, user specify the token, quantity (100), perform approval, and then initiate a transaction to deposit the tokens. At the end of the current week, 100 tokens will be distributed among participants who had Locks during the previous week.`.replaceAll(
  '\n',
  '<br/>'
);

export const addRewardsIntoNWeeksHint = `How does it work?
Deposit rewards evenly across a specified weeks starting from the current week.

Example 1:
The user wants to add reward tokens that will be distributed into few weeks starting from the current week. For example, the user adds 100 reward tokens for distribution for 5 weeks. It means that each following week will have 20 tokens for distribution (100 tokens / 5 weeks = 20 tokens per week).`.replaceAll(
  '\n',
  '<br/>'
);

export const addRewardsIntoExactWeekHint = `How does it work?
Deposit rewards into one specific week (corrent one or week in the future)

Example 1:
The user wants to add reward tokens that will be distributed in the one future week. For example, the user adds 100 reward tokens for distribution 4 weeks later. To do this, user specify the token, quantity (100), perform approval, and then initiate a transaction to deposit the tokens. After the fourth week, the reward tokens will be distributed among users who had Locks during the fourth week`.replaceAll(
  '\n',
  '<br/>'
);

export const unlockAllHint =
  `"Unclock All" can be called only once. After it contract becomes 90% useless

What does it mean?
Allows all users to withdraw their funds ahead of schedule. In case this option is activated, the contract effectively terminates (there is no turning back). New locks cannot be created.

Why would someone use it?
This functionality allows for the premature completion of the program, for example, in cases when:
- rewards may have run out,
- the owner has decided to terminate the reward program ahead of schedule,
- there is a need to unlock users in case of an emergency market situation,
- there is an error in the system management.

How does it work?
Admin calls function set_all_unlock(), and afterwards all locks can be withdrawn before lock-finish time without any penalties

What may remain?
Users can withdraw their locks at any time since option is activated.

Why does it becomes useless? In which way?
No new locks (deposits) are accepted anymore`.replaceAll('\n', '<br/>');

export const earlyUnlockHint = `Early Unlock
Admin can enable or disable early unlock at any time

What does it mean?
The contract administrator can allow users to withdraw locked funds before the Lock period expires. In this case, the administrator may impose a penalty on such users. The penalty is collected in tokens that were locked

Why would someone use it?
This functionality can provide users with the ability to withdraw funds in emergency situations for users.

How does it work?
The contract administrator can allow users to withdraw locked funds before the Lock period expires. In this case, the administrator may impose a penalty on such users. The penalty is collected in tokens that were locked`.replaceAll(
  '\n',
  '<br/>'
);
