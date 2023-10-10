import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  ),
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  twitter: Twitter,
  check: Check,
  copy: Copy,
  copyDone: ClipboardCheck,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  zoom: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 100 100"
      viewBox="0 0 100 100"
      id="zoom"
    >
      <g>
        <path
          fill="#2d8cff"
          d="M50,2.5C23.766,2.5,2.5,23.823,2.5,50.126c2.502,63.175,92.507,63.157,95,0C97.5,23.823,76.233,2.5,50,2.5
				z"
        ></path>
        <path
          fill="#f1f1f1"
          d="M78.285,63.557c-0.051,2.506-2.059,3.352-4.005,1.965c-3.629-2.54-7.233-5.115-10.851-7.669
				c0.009,1.182-0.007,3.966-0.001,5.177c-0.001,2.246-1.117,3.339-3.41,3.34l-19.536,0.002c-3.31,0.001-6.619,0.002-9.929-0.002
				c-6.257-0.007-10.462-4.106-10.464-10.201l0-19.205c0-2.278,1.081-3.34,3.4-3.34c7.951,0.151,21.843,0.017,29.638,0.003
				c5.525,0.006,9.522,3.442,10.19,8.52c3.656-2.58,7.297-5.181,10.963-7.748c1.691-1.227,3.917-0.833,4.005,1.966
				C78.309,45.151,78.338,54.754,78.285,63.557z"
        ></path>
      </g>
    </svg>
  ),
  teams: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="207"
      height="175"
      viewBox="0 0 207 175"
      id="teams"
    >
      <defs>
        <filter
          id="d"
          width="102.7%"
          height="102.4%"
          x="-1.4%"
          y="-1.2%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-1"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.19 0"
          ></feColorMatrix>
          <feOffset
            dx="1"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner2"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.17 0"
          ></feColorMatrix>
          <feOffset
            dx="2"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetInner3"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner3"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.01 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixInner1"></feMergeNode>
            <feMergeNode in="shadowMatrixInner2"></feMergeNode>
            <feMergeNode in="shadowMatrixInner3"></feMergeNode>
          </feMerge>
        </filter>
        <filter
          id="g"
          width="105%"
          height="105%"
          x="-2.5%"
          y="-2.5%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-1"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.19 0"
          ></feColorMatrix>
          <feOffset
            dx="1"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner2"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.17 0"
          ></feColorMatrix>
          <feOffset
            dx="2"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetInner3"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner3"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.01 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixInner1"></feMergeNode>
            <feMergeNode in="shadowMatrixInner2"></feMergeNode>
            <feMergeNode in="shadowMatrixInner3"></feMergeNode>
          </feMerge>
        </filter>
        <filter
          id="k"
          width="102.1%"
          height="101.9%"
          x="-1%"
          y="-.9%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner1"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feOffset
            dx="-1"
            dy="-1"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.17 0"
          ></feColorMatrix>
        </filter>
        <filter
          id="o"
          width="103.6%"
          height="103.6%"
          x="-1.8%"
          y="-1.8%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner1"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feOffset
            dx="-1"
            dy="-1"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.27 0"
          ></feColorMatrix>
        </filter>
        <filter
          id="u"
          width="103.1%"
          height="103.1%"
          x="-1.6%"
          y="-1.5%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner1"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feOffset
            dx="-1"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 0.215686275   0 0 0 0 0.270588235   0 0 0 0 0.698039216  0 0 0 1 0"
          ></feColorMatrix>
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner2"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feOffset
            dx="2"
            in="shadowBlurInner2"
            result="shadowOffsetInner2"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner2"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0.211764706   0 0 0 0 0.247058824   0 0 0 0 0.588235294  0 0 0 1 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixInner1"></feMergeNode>
            <feMergeNode in="shadowMatrixInner2"></feMergeNode>
          </feMerge>
        </filter>
        <filter
          id="w"
          width="148.8%"
          height="138.8%"
          x="-24.4%"
          y="-17.3%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="3"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0"
          ></feColorMatrix>
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter2"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter2"
            result="shadowBlurOuter2"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
          </feMerge>
        </filter>
        <filter
          id="z"
          width="117%"
          height="117%"
          x="-8.5%"
          y="-8.5%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"></feGaussianBlur>
        </filter>
        <linearGradient id="a" x1="103.648%" x2="4.41%" y1="100%" y2="3.534%">
          <stop offset="0%" stop-color="#4B5DE9"></stop>
          <stop offset="100%" stop-color="#3941C3"></stop>
        </linearGradient>
        <linearGradient
          id="h"
          x1="37.071%"
          x2="84.489%"
          y1="38.816%"
          y2="89.984%"
        >
          <stop offset="0%" stop-color="#505CDF"></stop>
          <stop offset="100%" stop-color="#7E93FF"></stop>
        </linearGradient>
        <linearGradient id="l" x1="19.27%" x2="95.313%" y1="10.369%" y2="100%">
          <stop offset="0%" stop-color="#414FB7"></stop>
          <stop offset="100%" stop-color="#5260D9"></stop>
        </linearGradient>
        <linearGradient
          id="q"
          x1="2.151%"
          x2="113.177%"
          y1="9.713%"
          y2="104.673%"
        >
          <stop offset="0%" stop-color="#1D2771"></stop>
          <stop offset="100%" stop-color="#2D38A5"></stop>
        </linearGradient>
        <linearGradient id="y" x1="29.468%" x2="97.963%" y1="50%" y2="50%">
          <stop offset="0%" stop-color="#F0F0F0"></stop>
          <stop offset="100%" stop-color="#FFF"></stop>
        </linearGradient>
        <pattern
          id="c"
          width="512"
          height="512"
          x="-512"
          y="-460"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#a"></use>
        </pattern>
        <pattern
          id="f"
          width="512"
          height="512"
          x="-487"
          y="-512"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#b"></use>
        </pattern>
        <pattern
          id="j"
          width="512"
          height="512"
          x="-512"
          y="-444"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#c"></use>
        </pattern>
        <pattern
          id="n"
          width="512"
          height="512"
          x="-492"
          y="-512"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#d"></use>
        </pattern>
        <pattern
          id="s"
          width="512"
          height="512"
          x="-512"
          y="-512"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#e"></use>
        </pattern>
        <circle id="e" cx="45" cy="20" r="20"></circle>
        <circle id="m" cx="48" cy="28" r="28"></circle>
        <rect id="p" width="96" height="96" rx="8"></rect>
        <rect id="v" width="96" height="98" y="-1" rx="8"></rect>
        <path
          id="b"
          d="M0.0995199027,95.2654288 C0.0340203685,94.8532592 0,94.4306026 0,94 L0,60 C0,55.581722 3.581722,52 8,52 L66,52 C70.418278,52 74,55.581722 74,60 L74,94 C74,94.4306026 73.9659796,94.8532592 73.9004801,95.2654288 C73.9664408,96.1683426 74,97.0802522 74,98 C74,118.434536 57.4345357,135 37,135 C16.5654643,135 0,118.434536 0,98 C0,97.0802522 0.0335591976,96.1683426 0.0995199027,95.2654288 Z"
        ></path>
        <path
          id="i"
          d="M0.0206311615,125.578993 C0.00695535871,125.387776 2.38439235e-17,125.1947 0,125 L0,76 C-5.41083001e-16,71.581722 3.581722,68 8,68 L88,68 C92.418278,68 96,71.581722 96,76 L96,125 C96,125.1947 95.9930446,125.387776 95.9793688,125.578993 C95.9930913,126.050985 96,126.524686 96,127 C96,153.509668 74.509668,175 48,175 C21.490332,175 0,153.509668 0,127 C0,126.524686 0.00690870053,126.050985 0.0206311615,125.578993 Z"
        ></path>
        <radialGradient
          id="r"
          cx="86.601%"
          cy="84.21%"
          r="60.992%"
          fx="86.601%"
          fy="84.21%"
        >
          <stop offset="0%" stop-color="#313DAE"></stop>
          <stop offset="100%" stop-color="#313DAE" stop-opacity="0"></stop>
        </radialGradient>
        <polygon
          id="x"
          points="67.965 30.989 52.985 30.989 52.985 72.014 43.911 72.014 43.911 30.989 29 30.989 29 23 67.965 23"
        ></polygon>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(6)">
        <g transform="translate(9)">
          <g transform="translate(53)">
            <g transform="translate(65 16)">
              <use fill="url(#a)" xlinkHref="#b"></use>
              <use fill="url(#c)" fill-opacity=".012" xlinkHref="#b"></use>
              <use fill="#000" filter="url(#d)" xlinkHref="#b"></use>
              <g>
                <use fill="url(#a)" xlinkHref="#e"></use>
                <use fill="url(#f)" fill-opacity=".012" xlinkHref="#e"></use>
                <use fill="#000" filter="url(#g)" xlinkHref="#e"></use>
              </g>
            </g>
            <use fill="url(#h)" xlinkHref="#i"></use>
            <use fill="url(#j)" fill-opacity=".012" xlinkHref="#i"></use>
            <use fill="#000" filter="url(#k)" xlinkHref="#i"></use>
            <g>
              <use fill="url(#l)" xlinkHref="#m"></use>
              <use fill="url(#n)" fill-opacity=".012" xlinkHref="#m"></use>
              <use fill="#000" filter="url(#o)" xlinkHref="#m"></use>
            </g>
          </g>
          <path d="M53.0206312,125.578993 C53.0069554,125.387776 53,125.1947 53,125 L53,76 C53,71.581722 56.581722,68 61,68 L141,68 C145.418278,68 149,71.581722 149,76 L149,125 C149,125.1947 148.993045,125.387776 148.979369,125.578993 C148.993091,126.050985 149,126.524686 149,127 C149,153.509668 127.509668,175 101,175 C74.490332,175 53,153.509668 53,127 C53,126.524686 53.0069087,126.050985 53.0206312,125.578993 Z M101,56 C85.536027,56 73,43.463973 73,28 C73,12.536027 85.536027,0 101,0 C116.463973,0 129,12.536027 129,28 C129,43.463973 116.463973,56 101,56 Z"></path>
          <g transform="translate(0 39)">
            <mask id="t" fill="#fff">
              <use xlinkHref="#p"></use>
            </mask>
            <use fill="url(#q)" xlinkHref="#p"></use>
            <use fill="url(#r)" xlinkHref="#p"></use>
            <use fill="url(#s)" fill-opacity=".013" xlinkHref="#p"></use>
            <g fill="#000" mask="url(#t)">
              <use filter="url(#u)" xlinkHref="#v"></use>
            </g>
            <g mask="url(#t)">
              <use fill="#000" filter="url(#w)" xlinkHref="#x"></use>
              <use fill="url(#y)" xlinkHref="#x"></use>
            </g>
          </g>
        </g>
        <path
          fill="#000"
          fill-opacity=".05"
          d="M18,39 L98,39 C102.418278,39 106,42.581722 106,47 L106,127 C106,131.418278 92.418278,145 88,145 L8,145 C3.581722,145 5.41083001e-16,141.418278 0,137 L0,57 C-5.41083001e-16,52.581722 13.581722,39 18,39 Z"
          filter="url(#z)"
        ></path>
      </g>
    </svg>
  ),
  googleMeet: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      data-name="Layer 1"
      viewBox="0 0 32 32"
      id="google-meet"
    >
      <path
        fill="#00ac47"
        d="M24,21.45V25a2.0059,2.0059,0,0,1-2,2H9V21h9V16Z"
      ></path>
      <polygon
        fill="#31a950"
        points="24 11 24 21.45 18 16 18 11 24 11"
      ></polygon>
      <polygon fill="#ea4435" points="9 5 9 11 3 11 9 5"></polygon>
      <rect width="6" height="11" x="3" y="11" fill="#4285f4"></rect>
      <path
        fill="#ffba00"
        d="M24,7v4h-.5L18,16V11H9V5H22A2.0059,2.0059,0,0,1,24,7Z"
      ></path>
      <path fill="#0066da" d="M9,21v6H5a2.0059,2.0059,0,0,1-2-2V21Z"></path>
      <path
        fill="#00ac47"
        d="M29,8.26V23.74a.9989.9989,0,0,1-1.67.74L24,21.45,18,16l5.5-5,.5-.45,3.33-3.03A.9989.9989,0,0,1,29,8.26Z"
      ></path>
      <polygon
        fill="#188038"
        points="24 10.55 24 21.45 18 16 23.5 11 24 10.55"
      ></polygon>
    </svg>
  ),
  radix: (props: LucideProps) => (
    <svg viewBox="0 0 25 25" fill="none" {...props}>
      <path
        d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
        fill="currentcolor"
      ></path>
      <path d="M12 0H4V8H12V0Z" fill="currentcolor"></path>
      <path
        d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
        fill="currentcolor"
      ></path>
    </svg>
  ),
  confluence: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      id="confluence"
    >
      <path
        fill="#2684FF"
        d="M0.364,20.339l4.965,3.048c0.361,0.219,0.83,0.112,1.05-0.247l0.005-0.009c3.146-5.245,3.774-4.482,13.169-0.033c0.38,0.183,0.834,0.019,1.017-0.36l0.01-0.019l2.363-5.333c0.169-0.379-0.005-0.822-0.38-0.995c-1.041-0.486-3.103-1.458-4.965-2.352C5.976,8.401,2.089,16.175,0.106,19.302v-0.001C-0.105,19.656,0.008,20.119,0.364,20.339L0.364,20.339z"
      ></path>
      <path
        fill="#2684FF"
        d="M23.894,4.711c0.211-0.355,0.098-0.818-0.258-1.038l-4.96-3.044c-0.352-0.233-0.825-0.145-1.06,0.206l-0.028,0.047c-3.155,5.263-3.803,4.468-13.155,0.042C4.054,0.742,3.6,0.905,3.417,1.284L3.408,1.303L1.04,6.636c-0.169,0.379,0.005,0.822,0.38,0.995C2.461,8.118,4.529,9.09,6.39,9.988c11.627,5.609,15.508-2.122,17.506-5.277L23.894,4.711L23.894,4.711z"
      ></path>
      <path
        fill="#2173DE"
        d="M10.158 12.043c-6.03-.001-8.571 4.924-10.052 7.259v-.001c-.211.355-.098.818.259 1.038l4.965 3.048C5.455 23.463 5.595 23.5 5.732 23.5c.255 0 .504-.127.647-.361l.005-.009c1.514-2.524 2.445-3.657 4.05-3.657.457 0 .969.092 1.565.27v-7.557C11.352 12.089 10.739 12.043 10.158 12.043L10.158 12.043zM4.107.849c-.285 0-.558.161-.691.435L3.408 1.303 1.04 6.636c-.169.379.005.822.38.995C2.461 8.118 4.529 9.09 6.39 9.988c2.114 1.02 3.973 1.599 5.61 1.844v-7.55c-1.66-.49-3.969-1.656-7.566-3.358C4.328.873 4.217.849 4.107.849L4.107.849z"
      ></path>
    </svg>
  ),
  googleDrive: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 512 512"
      viewBox="0 0 512 512"
      id="google-drive"
    >
      <polygon
        fill="#28b446"
        points="165.891 334.343 161.611 419.266 82.713 479.21 0 333.399 172.602 32.79 253.414 88.26 256.078 178.175 255.315 178.614"
      ></polygon>
      <polygon
        fill="#219b38"
        points="172.602 32.79 221.718 237.124 256.078 178.175 253.414 59.814"
      ></polygon>
      <polygon
        fill="#ffd837"
        points="339.385 32.79 512 333.399 418.917 380.477 345.204 333.851 345.204 333.399 256.078 178.175 172.602 32.79"
      ></polygon>
      <polygon
        fill="#518ef8"
        points="512 333.399 429.339 478.266 82.713 479.21 165.891 334.343 345.204 333.851"
      ></polygon>
      <polygon
        fill="#3a5bbc"
        points="82.713 479.21 227.749 334.173 165.891 334.343"
      ></polygon>
      <polygon
        fill="#fbbb00"
        points="512 333.399 322.76 294.31 345.204 333.851"
      ></polygon>
    </svg>
  ),
  oneDrove: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="192"
      height="124"
      viewBox="0 0 192 124"
      id="onedrive"
    >
      <defs>
        <linearGradient id="a" x1="103.648%" x2="3.848%" y1="100%" y2="0%">
          <stop offset="0%" stop-color="#0D58BF"></stop>
          <stop offset="100%" stop-color="#0A3070"></stop>
        </linearGradient>
        <linearGradient id="e" x1="0%" x2="105.047%" y1="58.792%" y2="77.978%">
          <stop offset="0%" stop-color="#007FC0"></stop>
          <stop offset="100%" stop-color="#00E6FF"></stop>
        </linearGradient>
        <linearGradient
          id="i"
          x1="4.973%"
          x2="101.385%"
          y1="6.558%"
          y2="97.733%"
        >
          <stop offset="0%" stop-color="#0094F2"></stop>
          <stop offset="100%" stop-color="#00C8FF"></stop>
        </linearGradient>
        <linearGradient
          id="l"
          x1="6.798%"
          x2="86.84%"
          y1="16.006%"
          y2="57.988%"
        >
          <stop offset="0%" stop-color="#004FA7"></stop>
          <stop offset="100%" stop-color="#006DD9"></stop>
        </linearGradient>
        <pattern
          id="c"
          width="512"
          height="512"
          x="-476"
          y="-512"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#a"></use>
        </pattern>
        <pattern
          id="g"
          width="512"
          height="512"
          x="-503"
          y="-454.322"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#b"></use>
        </pattern>
        <pattern
          id="k"
          width="512"
          height="512"
          x="-399"
          y="-468"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#c"></use>
        </pattern>
        <pattern
          id="n"
          width="512"
          height="512"
          x="-512"
          y="-486"
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#d"></use>
        </pattern>
        <filter
          id="d"
          width="101.6%"
          height="101.6%"
          x="-.8%"
          y="-.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-1"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.19 0"
          ></feColorMatrix>
          <feOffset
            dx="1"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner2"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.17 0"
          ></feColorMatrix>
          <feOffset
            dx="2"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetInner3"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner3"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.01 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixInner1"></feMergeNode>
            <feMergeNode in="shadowMatrixInner2"></feMergeNode>
            <feMergeNode in="shadowMatrixInner3"></feMergeNode>
          </feMerge>
        </filter>
        <filter
          id="h"
          width="100.6%"
          height="101.5%"
          x="-.3%"
          y="-.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-1"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.19 0"
          ></feColorMatrix>
        </filter>
        <filter
          id="o"
          width="101.8%"
          height="102.6%"
          x="-.9%"
          y="-1.3%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="1"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.32 0"
          ></feColorMatrix>
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner2"
            stdDeviation=".5"
          ></feGaussianBlur>
          <feOffset
            dx="-1"
            dy="-1"
            in="shadowBlurInner2"
            result="shadowOffsetInner2"
          ></feOffset>
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner2"
          ></feComposite>
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.32 0"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixInner1"></feMergeNode>
            <feMergeNode in="shadowMatrixInner2"></feMergeNode>
          </feMerge>
        </filter>
        <path
          id="f"
          d="M186.965698,102.162306 C180.963575,112.17891 169.66041,121.480173 157.55483,123.02942 C149.484444,124.062251 112.817777,124.052445 47.5548302,123 C31.7600417,123 17.7470794,114.73937 8.99970484,102.944518 L113,57.6779175 L186.965698,102.162306 Z"
        ></path>
        <path
          id="j"
          d="M113,57.6535664 L136.845694,47.4867975 C141.764556,45.2474496 147.230327,44 152.987456,44 C174.526561,44 191.987456,61.4608948 191.987456,83 C191.987456,89.9646418 190.161843,96.5028888 186.963052,102.162306 L113,57.6535664 Z"
        ></path>
        <path
          id="m"
          d="M8.99970484,102.948181 C3.33797991,95.0649963 1.91846539e-13,84.4482555 1.91846539e-13,74 C1.91846539e-13,47.490332 21.490332,26 48,26 C58.4487588,26 68.1177466,29.3385967 75.9984048,35.0072315 L76,35 L113,57.6779175 L8.99970484,102.948181 Z"
        ></path>
        <circle id="b" cx="97" cy="61" r="61"></circle>
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="url(#a)" xlinkHref="#b"></use>
        <use fill="url(#c)" fillOpacity=".012" xlinkHref="#b"></use>
        <use fill="#000" filter="url(#d)" xlinkHref="#b"></use>
        <use fill="url(#e)" xlinkHref="#f"></use>
        <use fill="url(#g)" fillOpacity=".012" xlinkHref="#f"></use>
        <use fill="#000" filter="url(#h)" xlinkHref="#f"></use>
        <g>
          <use fill="url(#i)" xlinkHref="#j"></use>
          <use fill="url(#k)" fillOpacity=".012" xlinkHref="#j"></use>
        </g>
        <g>
          <use fill="url(#l)" xlinkHref="#m"></use>
          <use fill="url(#n)" fillOpacity=".012" xlinkHref="#m"></use>
          <use fill="#000" filter="url(#o)" xlinkHref="#m"></use>
        </g>
      </g>
    </svg>
  ),
  notion: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      id="notion"
    >
      <path
        fill="#fff"
        d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24Z"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="m28.46 9.068-16.65 1.226c-1.342.116-1.81.991-1.81 2.04v18.198c0 .817.292 1.516.993 2.45l3.914 5.074c.643.817 1.227.992 2.455.934l19.335-1.167c1.635-.116 2.103-.875 2.103-2.158V15.193c0-.664-.263-.855-1.037-1.42a46.72 46.72 0 0 1-.132-.097l-5.315-3.733c-1.285-.932-1.811-1.05-3.856-.875ZM17.8 14.857c-1.579.106-1.937.13-2.834-.597l-2.28-1.808c-.232-.234-.115-.526.468-.584l16.007-1.166c1.343-.117 2.044.35 2.57.758l2.746 1.983c.117.059.408.408.058.408l-16.531.992-.204.014ZM15.959 35.49V18.11c0-.759.233-1.109.934-1.168l18.985-1.108c.644-.058.936.35.936 1.108v17.264c0 .759-.117 1.401-1.17 1.459l-18.167 1.05c-1.051.058-1.518-.291-1.518-1.225Zm17.935-16.448c.116.525 0 1.05-.527 1.11l-.876.173v12.832c-.76.408-1.46.641-2.044.641-.935 0-1.17-.292-1.87-1.166l-5.726-8.982v8.69l1.812.409s0 1.05-1.462 1.05l-4.03.233c-.116-.234 0-.816.41-.933l1.05-.291v-11.49l-1.46-.118c-.116-.525.175-1.283.994-1.341l4.323-.292 5.959 9.1v-8.05l-1.52-.174c-.116-.643.35-1.109.935-1.167l4.032-.234Z"
        clipRule="evenodd"
      ></path>
    </svg>),
  aria: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
    </svg>
  ),
  npm: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
        fill="currentColor"
      />
    </svg>
  ),
  yarn: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z"
        fill="currentColor"
      />
    </svg>
  ),
  pnpm: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
        fill="currentColor"
      />
    </svg>
  ),
  react: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="currentColor"
      />
    </svg>
  ),
  tailwind: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  paypal: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
        fill="currentColor"
      />
    </svg>
  ),
};
