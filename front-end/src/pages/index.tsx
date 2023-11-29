//COMPONENTS
//import { Container } from "@/ui/components/container/container";
//import { Seo } from "@/ui/components/seo/seo";

// DESIGN SYSTEM
//import { Avatar } from "@/ui/design-system/avatar/avatar";
import { Button } from "@/ui/design-system/button/button";
//import { Logo } from "@/ui/design-system/logo/logo";
import { Typography } from "@/ui/design-system/typography/typography";
import { Spinner } from "@/ui/design-system/spinner/spinner";

//ICO
import { RiNotification2Fill, RiShieldUserLine } from "react-icons/ri";
//import { Layout } from "@/ui/components/layout/layout";
export default function DesignSystem() {
  return (
    <>
      {/* <Seo
        title="Design System"
        description="Design system of the coders monkeys application"
      /> */}
      {/* <Layout> */}
      {/* <Container className="py-10 space-y-10"> */}
      {/* Typography */}
      <div className="space-y-2">
        <Typography variant="caption2" weight="medium">
          Typography
        </Typography>
        <div className="flex flex-col gap-2 p-5 border border-gray-400 divide-y-2 divide-gray-400 rounded">
          <div className="pb-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              Display
            </Typography>
            <Typography variant="display">Nothing is impossible</Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              H1
            </Typography>
            <Typography variant="h1">
              Nothing is impossible, the word itself says, I’m possible!
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              H2
            </Typography>
            <Typography variant="h2">
              Your time is limited, so don’t waste it living someone else’s life
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              H3
            </Typography>
            <Typography variant="h3">
              Daily Report: Removing Checks to the Power of the Internet Titans
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              H4
            </Typography>
            <Typography variant="h4">
              Daily Report: Removing Checks to the Power of the Internet Titans
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              H5
            </Typography>
            <Typography variant="h5">
              Daily Report: Removing Checks to the Power of the Internet Titans
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              Lead
            </Typography>
            <Typography variant="lead">
              Nothing is impossible, the word itself says, I’m possible!
            </Typography>
            <Typography variant="lead" weight="medium">
              Nothing is impossible, the word itself says, I’m possible!
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              Body lg
            </Typography>
            <Typography variant="body-lg">
              When I was 5 years old, my mother always told me that happiness
              was the key to life. When I went to school, they asked me what I
              wanted to be when I grew up.
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              Body base
            </Typography>
            <Typography variant="body-base">
              When I was 5 years old, my mother always told me that happiness
              was the key to life. When I went to school, they asked me what I
              wanted to be when I grew up.
            </Typography>
          </div>
          <div className="py-5 space-y-2">
            <Typography variant="caption3" weight="medium">
              Body sm
            </Typography>
            <Typography variant="body-sm">
              When I was 5 years old, my mother always told me that happiness
              was the key to life. When I went to school, they asked me what I
              wanted to be when I grew up. I wrote down.
            </Typography>
          </div>
          <div className="flex items-start divide-x-2 divide-gray-400 gap-7">
            <div className="py-5 space-y-2 pl-7 first:pl-0">
              <Typography variant="caption3" weight="medium">
                Caption 1
              </Typography>
              <Typography variant="caption1">Regular</Typography>
              <Typography variant="caption1" weight="medium">
                Medium
              </Typography>
            </div>
            <div className="py-5 space-y-2 pl-7 first:pl-0">
              <Typography variant="caption3" weight="medium">
                Caption 2
              </Typography>
              <Typography variant="caption2">Regular</Typography>
              <Typography variant="caption2" weight="medium">
                Medium
              </Typography>
            </div>
            <div className="py-5 space-y-2 pl-7">
              <Typography variant="caption3" weight="medium">
                Caption 3
              </Typography>
              <Typography variant="caption3">Regular</Typography>
              <Typography variant="caption3" weight="medium">
                Medium
              </Typography>
            </div>
            <div className="h-full pt-5 space-y-2 pl-7">
              <Typography variant="caption3" weight="medium">
                Caption 4
              </Typography>
              <Typography variant="caption4">Regular</Typography>
              <Typography variant="caption4" weight="medium">
                Medium
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-7">
        {/* Spinners */}
        <div className="space-y-2">
          <Typography variant="caption2" weight="medium">
            Spinners
          </Typography>
          <div className="flex items-center gap-2 p-5 border border-gray-400 rounded">
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
          </div>
        </div>
        {/* Avatar */}
        <div className="space-y-2">
          <Typography variant="caption2" weight="medium">
            Avatar
          </Typography>
          <div className="flex items-center gap-2 p-5 border border-gray-400 rounded">
            {/* <Avatar
                  size="small"
                  src="/assets/images/lore.jpg"
                  alt="daniel-lincoln | Avatar"
                />
                <Avatar
                  src="/assets/images/lore.jpg"
                  alt="daniel-lincoln | Avatar"
                />
                <Avatar
                  size="large"
                  src="/assets/images/photo-de-profil.jpg"
                  alt="daniel-lincoln | Avatar"
                /> */}
          </div>
        </div>
        {/* Logo */}
        <div className="space-y-2">
          <Typography variant="caption2" weight="medium">
            Logo
          </Typography>
          {/* <div className="flex items-center gap-2 p-5 border border-gray-400 rounded">
                <Logo size="very-small" />
                <Logo size="small" />
                <Logo />
                <Logo size="large" />
              </div> */}
        </div>
      </div>
      {/* Buttons */}
      <div className="space-y-2">
        <Typography variant="caption2" weight="medium">
          Buttons
        </Typography>
        <div className="p-5 space-y-8 border border-gray-400 rounded">
          <div className="space-y-2">
            <Typography variant="caption3" weight="medium">
              Small
            </Typography>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button isLoading size="small">
                  Accent
                </Button>
                <Button
                  isLoading
                  size="small"
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button isLoading variant="secondary" size="small">
                  secondary
                </Button>
                <Button
                  isLoading
                  size="small"
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  size="small"
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  size="small"
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button isLoading size="small" variant="outline">
                  outline
                </Button>
                <Button isLoading size="small" disabled variant="disabled">
                  disabled
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="small">Accent</Button>
                <Button
                  size="small"
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button variant="secondary" size="small">
                  secondary
                </Button>
                <Button
                  size="small"
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  size="small"
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  size="small"
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button size="small" variant="outline">
                  outline
                </Button>
                <Button size="small" disabled variant="disabled">
                  disabled
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Typography variant="caption3" weight="medium">
              Medium
            </Typography>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button isLoading>Accent</Button>
                <Button
                  isLoading
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button isLoading variant="secondary">
                  secondary
                </Button>
                <Button
                  isLoading
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button isLoading variant="outline">
                  outline
                </Button>
                <Button isLoading disabled variant="disabled">
                  disabled
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button>Accent</Button>
                <Button
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button variant="secondary">secondary</Button>
                <Button
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button variant="outline">outline</Button>
                <Button disabled variant="disabled">
                  disabled
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Typography variant="caption3" weight="medium">
              Large
            </Typography>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button isLoading size="large">
                  Accent
                </Button>
                <Button
                  isLoading
                  size="large"
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button isLoading variant="secondary" size="large">
                  secondary
                </Button>
                <Button
                  isLoading
                  size="large"
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  size="large"
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  isLoading
                  size="large"
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button isLoading size="large" variant="outline">
                  outline
                </Button>
                <Button isLoading size="large" disabled variant="disabled">
                  disabled
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="large">Accent</Button>
                <Button
                  size="large"
                  icon={{
                    icon: RiShieldUserLine,
                  }}
                  iconPosition="left"
                >
                  Accent
                </Button>
                <Button variant="secondary" size="large">
                  secondary
                </Button>
                <Button
                  size="large"
                  variant="ico"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  size="large"
                  variant="ico"
                  iconTheme="secondary"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button
                  size="large"
                  variant="ico"
                  iconTheme="gray"
                  icon={{
                    icon: RiNotification2Fill,
                  }}
                />
                <Button size="large" variant="outline">
                  outline
                </Button>
                <Button size="large" disabled variant="disabled">
                  disabled
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Container> */}
      {/* </Layout> */}
    </>
  );
}
