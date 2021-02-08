# Software Requirements

## Vision

To provide a user with an easy way of tracking the taking of medications, because:

- remembering to take one's meds, and which meds one has taken, isn’t always easy or straightforward, and to make tracking that easier means making tracking more likely.

- skipping a day or taking a pill more often than prescribed can be dangerous, making an easy, reliable way to track them is invaluable.

- the ability to track symptoms along with meds can translate into the correlation of the two and data-based adjustments. (Stretch goal: graphs, data analysis, etc.)

## Scope (In/Out)

- IN: Our mobile app will allow users to do the following:

  - Add their medications, including the names, dosages, frequencies and time(s) of day to be taken.
  - Check off medications as they're taken and display that the medication has been taken.
  - Edit a medication's propile.
  - Sign up, sign in, and sign out.
  - Edit one's personal profile.

- OUT: Our mobile app will not do the following:

  - be deployed publically (initially, becaus of Hippa requirements).
  - have tablet, desktop, or web versions. 

## Stretch goals

- Edit and delete a profile.
- Edit and delete a medication.
- Display medications by time, not just date, so that a med that is taken twice a day will show up twice in the list.
- Reminders.
- Sign out.
- Deploy: Hippa is something to have to consider before deployment is possible.
- Tablet version.
- Desktop and web version.

## Functional Requirements

- Administrators may create and delete accounts.
- Users may create (stretch: edit and delete) their profiles.
- Users may add (stretch: edit and delete) their medications.
- Users may add (stretch: edit, delete, delete all) a med to history (e.g., taken).
- Users may see a history (get all) of meds taken (stretch: get one).

## Data Flow

1. A user downloads the app from the app store.
2. A user creates an account with a username, password, and email.
3. A user signs in with username and password (basic auth).
4. A user adds a medication, including its name, dosage, time of day, and frequency to be taken.
5. A user views a list of meds to be taken on any given day.
6. A user marks a medication as taken for any given day.
7. A user views a history of meds taken for any given day.
8. Stretch: a user edits or deletes his/her/their profile.
9. Stretch: a user edits or deletes a medication.
10. Stretch: a user deletes all medications.
11. Stretch: a user deletes a day's history.
12. Stretch: a user deletes all history.
13. Stretch: a user views a list of meds to be taken in a given day by the time they're to be taken.

## Non-Functional Requirements (301 & 401 only)

- Sign-in is secured by basic authorization.
- Create (apart from sign up), Read, Update, and Delete are secured with bearer authorization.
- This is a mobile app, so that tracking can take place anywhere, anytime. Desktop and web versions are stretch goals.
- Hippa requirements may mean that we can't deploy this app publicly for presentation purposes.
