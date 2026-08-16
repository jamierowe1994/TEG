// One easing language for the whole experience.
export const EASE = [0.16, 1, 0.3, 1]; // expo-out — decisive arrival, soft settle

export const SPRING_SOFT = { type: 'spring', stiffness: 60, damping: 18, mass: 1 };

// Shared viewport config for whileInView reveals
export const VIEWPORT = { once: true, margin: '-80px' };

// Standard reveal variants
export const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
};

export const fade = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut', delay: i * 0.08 },
  }),
};