'use client'

import Image from 'next/image'
import { useState } from 'react'

const CopyButton = () => {
	const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        setIsCopied(true)
        navigator.clipboard.writeText('Test copy');
        setTimeout(() => setIsCopied(false), 3000);
      };
    
	return (
		<Image
			src={isCopied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
			alt='copy button'
			width={12}
			height={12}
            onClick={handleCopy}
		/>
	)
}

export default CopyButton
