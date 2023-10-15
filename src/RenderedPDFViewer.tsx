import { PDFViewer as PDFViewerRenderer } from '@react-pdf/renderer';
import { ComponentProps, FC, useDeferredValue, useEffect, useState } from 'react';
import { useRenderPDF } from './useRenderPDF';

export const RenderedPDFViewer: FC<
  Omit<ComponentProps<typeof PDFViewerRenderer>, 'children'> & {
    data: string;
  }
> = ({ style, className, data, innerRef, showToolbar = true, ...props }) => {
  const { url, loading, error } = useRenderPDF({ data });

  let start = Date.now();
  const src = url ? `${url}#toolbar=${showToolbar ? 1 : 0}` : null;

  useEffect(() => {
    console.log({loading,error,src})
    if (!loading && !error && src !== null) {
      // Display the alert only once when the PDF is loaded for the first time
      alert(`Time taken ${(Date.now() - start) } ms`);

    }
  }, [loading, error, src, data]);

  if (loading)
    return (
      // @ts-ignore
      <div className={className} style={style}>
        Loading...
      </div>
    );

  if (error) {
    console.log({ error });
    return (
      // @ts-ignore
      <div className={className} style={style}>
        {JSON.stringify(error)}
      </div>
    );
  }
  
  return (
    <div>
      <iframe
      // @ts-ignore
      src={src}
      ref={innerRef}
      // @ts-ignore
      style={style}
      className={className}
      {...props}
      />
    </div>
  );
};
