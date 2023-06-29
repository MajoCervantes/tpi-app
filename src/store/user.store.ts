import { create } from 'zustand';
import { produce } from 'immer';
import { fireb } from '@/firebase/firebase.config';

type UserState = {
	currentUser: { name: string; lastName: string; loginDate: Date } | null;
	setCurrentUser: (
		currentUser: {
			name: string;
			lastName: string;
			loginDate: Date;
		} | null
	) => void;
	name: string;
	setName: (name: string) => void;
	lastName: string;
	setLastName: (lastName: string) => void;
	email: string;
	setEmail: (email: string) => void;
	password: string;
	setPassword: (password: string) => void;
	confirmPassword: string;
	loginDate: Date | null;
	setLoginDate: (loginDate: Date) => void;
	setConfirmPassword: (confirmPassword: string) => void;
	createUserWithEmailAndPassword: () => Promise<void>;
	loginWithEmailAndPassword: () => Promise<void>;
	error: string | null;
	setError: (error: string | null) => void;
};

const initialState: UserState = {
	currentUser: null,
	setCurrentUser: () => {},
	name: '',
	setName: () => {},
	lastName: '',
	setLastName: () => {},
	email: '',
	setEmail: () => {},
	password: '',
	setPassword: () => {},
	setConfirmPassword: () => {},
	confirmPassword: '',
	loginDate: null,
	setLoginDate: () => {},
	createUserWithEmailAndPassword: () => Promise.resolve(),
	loginWithEmailAndPassword: () => Promise.resolve(),
	error: null,
	setError: () => {},
};

//Save the information in localStorage to maintain persistence
let parsedState = {};
if (typeof localStorage !== 'undefined') {
	const savedState = localStorage.getItem('userState');
	parsedState = savedState ? JSON.parse(savedState) : {};
}

const userStore = create<UserState>((set) => ({
	...initialState,
	...parsedState,
	setCurrentUser: (currentUser) =>
		set((state) =>
			produce(state, (draft) => {
				draft.currentUser = currentUser;
			})
		),

	setName: (name) =>
		set((state) =>
			produce(state, (draft) => {
				draft.name = name;
			})
		),

	setLastName: (lastName) =>
		set((state) =>
			produce(state, (draft) => {
				draft.lastName = lastName;
			})
		),

	setEmail: (email) =>
		set((state) =>
			produce(state, (draft) => {
				draft.email = email;
			})
		),

	setPassword: (password) =>
		set((state) =>
			produce(state, (draft) => {
				draft.password = password;
			})
		),

	setConfirmPassword: (confirmPassword) =>
		set((state) =>
			produce(state, (draft) => {
				draft.confirmPassword = confirmPassword;
			})
		),

	setLoginDate: (loginDate) =>
		set((state) =>
			produce(state, (draft) => {
				draft.loginDate = loginDate;
			})
		),

	setError: (error) =>
		set((state) =>
			produce(state, (draft) => {
				draft.error = error;
			})
		),
	createUserWithEmailAndPassword: async () => {
		const { email, password, confirmPassword, name, lastName } =
			userStore.getState();

		if (password !== confirmPassword) {
			console.log('Las contraseñas no coinciden.');
			return;
		}

		try {
			const { user } = await fireb
				.auth()
				.createUserWithEmailAndPassword(email, password);
			const userRef = fireb.firestore().collection('users').doc(user?.uid);
			await userRef.set({
				name: name,
				lastName: lastName,
				email: email,
			});

			localStorage.setItem('currentUser', JSON.stringify(userStore.getState()));
		} catch (error: any) {
			console.error(error.message);
		}
	},

	loginWithEmailAndPassword: async () => {
		const { email, password } = userStore.getState();

		try {
			await fireb.auth().signInWithEmailAndPassword(email, password);

			const currentUser = fireb.auth().currentUser;

			if (currentUser) {
				const userRef = fireb
					.firestore()
					.collection('users')
					.doc(currentUser.uid);
				const userDoc = await userRef.get();

				if (userDoc.exists) {
					const userData = userDoc.data();

					userStore.setState({
						name: userData?.name,
						lastName: userData?.lastName,
						loginDate: new Date(),
					});

					userStore.setState({
						currentUser: {
							name: userData?.name,
							lastName: userData?.lastName,
							loginDate: new Date(),
						},
					});
				}
			}

			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('userState', JSON.stringify(userStore.getState()));
			}

			userStore.setState({ error: null });
		} catch (error: any) {
			userStore.setState({ currentUser: null });
			userStore.setState({ error: 'El usuario no existe' });
		}
	},
}));

export default userStore;
