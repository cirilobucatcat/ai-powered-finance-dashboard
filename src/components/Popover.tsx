import React, { useState, useRef, useEffect } from 'react';

const Popover = ({ content, children, contentClass }: { contentClass: string, content: React.ReactNode, children: React.ReactNode }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='popover-container'>
            <button
                ref={buttonRef}
                onClick={() => setVisible(!visible)}
                aria-haspopup='true'
                aria-expanded={visible}
                aria-controls='popover-content'
            >
                {children}
            </button>

            {visible && (
                <div
                    ref={popoverRef}
                    className={`popover-content ${contentClass}`}
                    role='dialog'
                    aria-modal='true'
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;
