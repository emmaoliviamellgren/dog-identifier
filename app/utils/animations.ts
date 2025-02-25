const slideUpOnEnter = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, ease: 'easeOut' },
};

const bounceInOnEnter = {
	initial: { scale: 0 },
	animate: { scale: 1 },
};

export { slideUpOnEnter, bounceInOnEnter };
