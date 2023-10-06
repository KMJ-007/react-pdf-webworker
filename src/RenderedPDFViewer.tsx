import { PDFViewer as PDFViewerRenderer } from '@react-pdf/renderer';
import { ComponentProps, FC, useDeferredValue } from 'react';
import { useRenderPDF } from './useRenderPDF';

export const RenderedPDFViewer: FC<
  Omit<ComponentProps<typeof PDFViewerRenderer>, 'children'> & {
    data: string;
  }
> = ({ style, className, data, innerRef, showToolbar = true, ...props }) => {
  const { url, loading, error } = useRenderPDF({ data });

  const src = url ? `${url}#toolbar=${showToolbar ? 1 : 0}` : null;
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
    <iframe
      // @ts-ignore
      src={src}
      ref={innerRef}
      // @ts-ignore
      style={style}
      className={className}
      {...props}
    />
  );
};
